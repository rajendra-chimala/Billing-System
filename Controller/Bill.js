const Bill = require('../Model/Bill');
const User = require('../Model/User');

const Product = require('../Model/Product'); 

const createBill = async (req, res) => {
    const { customerName, items } = req.body;
    const userID = req.user.userId;

    try {
        const user = await User.findById(userID);
        if (!user || !user.storeID) {
            return res.status(404).json({ error: 'User or store not found' });
        }

        const storeID = user.storeID;

        let totalAmt = 0;
        for (const item of items) {
            const product = await Product.findById(item.productID);
            if (!product) {
                return res.status(404).json({ error: `Product not found for ID: ${item.productID}` });
            }
            totalAmt += product.price * item.quantity;
        }

        const newBill = new Bill({
            storeID,
            customerName,
            items,
            total: totalAmt 
        });

        await newBill.save();
        res.status(201).json({ message: 'Bill created successfully', bill: newBill });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getBillsByStoreID = async (req, res) => {
    const { storeID } = req.params;

    try {
        const bills = await Bill.find({ storeID });
        res.status(200).json(bills);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateBill = async (req, res) => {
    const { billID } = req.params;
    const { customerName, items } = req.body;

    try {
        const updatedBill = await Bill.findByIdAndUpdate(
            billID,
            { customerName, items },
            { new: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill updated successfully', bill: updatedBill });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteBill = async (req, res) => {
    const { billID } = req.params;

    try {
        const deletedBill = await Bill.findByIdAndDelete(billID);

        if (!deletedBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createBill,
    getBillsByStoreID,
    updateBill,
    deleteBill
};
