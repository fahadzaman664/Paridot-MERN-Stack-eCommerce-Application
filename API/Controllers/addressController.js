import { AddressModel } from "../Models/AddressModel.js";

export const addAddress = async (req, res) => {
    try {
        let { fullName, address, city, state, country, pinCode, phoneNumber } = req.body;
        let userId = req.user;
         const userAddress = await AddressModel.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pinCode,
            phoneNumber
        });

        return res.status(201).json({ message: 'user address added succesfuly', success: true, Address: userAddress })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error', success:false });
    }
}

// get user adress
export const getAddress = async(req,res)=>{
  try { 
       const address = await AddressModel.find({userId:req.user}).sort({CreatedAt:-1});
       if(!address){
       return res.satus(404).json({message:'no address found', success:false});
       }

        return res.status(201).json({message:'user address',success:true, useraddress: address[0]});

    
  } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}
