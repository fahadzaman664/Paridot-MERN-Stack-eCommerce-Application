import { CartModel } from "../Models/CartModel.js";

// add to cart
export const addtocart = async (req, res) => {
    try {
        const { title, price, qty, productId, imgSrc } = req.body
        const userId = req.user;

        const cleanedPriceStr = price.toString().replace(/[^0-9.]/g, "");
        const numericPrice = parseFloat(cleanedPriceStr);
        // Validate quantity
        if (qty <= 0) {
            return res
                .status(201)
                .json({ message: "no product added to cart, Quantity must be greater than 0", success: false });
        }

        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            // create new instance of cart model
            cart = new CartModel({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += numericPrice * qty;
        }


        else {
            // then push items in item array
            cart.items.push({ title, price: numericPrice * qty, qty, productId, imgSrc });
        }


        // now save cart
        await cart.save();
        res.status(201).json({ message: 'item added to cart sucessfully...', success: true, cart: cart })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}

// get user specific cart
export const getuserspecificCart = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: 'no cart found', succes: false });
        }

        res.status(201).json({ message: 'fetched user cart data', cart: cart, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

//remove product by id
export const removeproductbyId = async (req, res) => {

    try {

        const productid = req.params.id;
        const userId = req.user;

        const cart = await CartModel.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ message: 'no cart found', success: false })
        }
        if (cart.items == '') {
            return res.status(404).json({ message: 'no product for deletion', success: false })
        }
        // Remove the product from the cart items array
        cart.items = cart.items.filter(item => item.productId.toString() !== productid);
        await cart.save();

        res.status(201).json({ message: 'product removed successfuly', success: true })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

// delete/clear the cart 
export const clearCart = async (req, res) => {

    try {
        const userId = req.user;

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({ userId, items: [] });
            return res.status(404).json({
                message: 'No cart found for user',
                success: false
            });
        }

        else {
            cart.items = []
        }

        await cart.save();
        res.status(200).json({ message: 'user cart cleared', success: true })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }

}

// decrease the quantity of product
export const decreaseCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        // userid comming from auth  middleware, globaly available
        const userId = req.user;

        if (!productId || !qty || qty <= 0) {
            return res.status(400).json({
                message: 'Invalid product ID or quantity',
                success: false
            });
        }

        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
                success: false
            });
        }

        // now finding existing item by productid, if found then we add qty
        // if product id found im item then add qty
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() == productId
        )

        // if item found then decrease the quantity
        // -1 return when no item found, 
        // if greater then -1 mean item found
        if (itemIndex > -1) {

            const item = cart.items[itemIndex]
            // for quantity greater then 0
            if (item.qty > qty) {

                const priceperunit = item.price / item.qty;
                item.qty -= qty;
                item.price -= priceperunit * qty;

            }
            else {
                // Log removed product ID (optional)
                console.log(`Removed product from cart: ${item.productId}`);
                cart.items.splice(itemIndex, 1);
                await cart.save();
                return res.status(201).json({
                    message: 'Product removed from cart',
                    cart: cart,
                    success: true,
                    removed: true,   // 👈 send explicit flag!
                });
            }
        }
        else {
            return res.status(404).json({ message: 'no proudct id found' })
        }


        await cart.save();
        return res.status(201).json({ message: 'item qty decreased', cart: cart, succes: true })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}



