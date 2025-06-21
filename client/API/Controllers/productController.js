import { ProductModel } from "../Models/ProductModel.js";
export const addProduct = async (req, res) => {
    let { title, description, category, price, qty, imgSrc } = req.body

    try {
        // Validate and clean fields
        const fields = { title, description, category, price, qty, imgSrc };

        if (fields.price != null) {
            const priceNum = Number(fields.price);
            if (isNaN(priceNum) || priceNum < 0) {
                return res.status(400).json({ message: 'Price must be a valid non-negative number', success: false });
            }
            fields.price = priceNum;
        }

        // Safely parse and validate qty
        if (fields.qty != null) {
            const qtyNum = Number(fields.qty);
            if (isNaN(qtyNum) || qtyNum < 0) {
                return res.status(400).json({ message: 'Quantity must be a valid non-negative number', success: false });
            }
            fields.qty = qtyNum;
        }


        let product = await ProductModel.create(
            fields
        )
        res.status(201).json({ message: 'product added sucessfult...', success: true, product: product })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}

// get all products
export const getallProducts = async (req, res) => {
    try {
        let products = await ProductModel.find().sort({ createdAt: -1 });
        if (products.length === 0) {
            return res.status(404).json({ message: 'products not exist', success: false })
        }

        res.status(201).json({ message: 'all products fetched', products: products, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}

// get product by id
export const getProductByID = async (req, res) => {
    try {
        const id = req.params.productid;
        let product = await ProductModel.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'invalid id', success: false })
        }

        res.status(201).json({ message: 'specific product found', product: product, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}

// update product by id
export const updateProductByID = async (req, res) => {
    try {
        let { title, description, category, price, qty, imgSrc } = req.body;
        const id = req.params.productid;

        const fields = { title, description, category, price, qty, imgSrc };


        // Validate and clean fields
        if (fields.price != null) {
            const priceNum = Number(fields.price);
            if (isNaN(priceNum) || priceNum < 0) {
                return res.status(400).json({ message: 'Price must be a valid non-negative number', success: false });
            }
            fields.price = priceNum;
        }

        // Safely parse and validate qty
        if (fields.qty != null) {
            const qtyNum = Number(fields.qty);
            if (isNaN(qtyNum) || qtyNum < 0) {
                return res.status(400).json({ message: 'Quantity must be a valid non-negative number', success: false });
            }
            fields.qty = qtyNum;
        }

        let product = await ProductModel.findByIdAndUpdate(
            id,
            fields,
            { new: true });

        if (!product) {
            return res.status(404).json({ message: 'invalid id', success: false })
        }

        res.status(201).json({ message: 'product has been updated', product: product, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}

// delete product by id
export const deleteProductByID = async (req, res) => {
    try {
        const id = req.params.productid;

        let product = await ProductModel.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: 'invalid id', success: false })
        }

        res.status(201).json({ message: 'product has been deleted', product: product, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}