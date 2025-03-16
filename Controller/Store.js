const Store = require('../Model/Store');

const createStore = async (req, res) => {
    const { name, address, ownerName, email, contact } = req.body;
    const userID = req.user.userId;
  
    try {
      const newStore = new Store({
        name,
        address,
        ownerName,
        email,
        contact,
        userID
      });
  
      await newStore.save();
      res.status(201).json({ message: 'Store created successfully', store: newStore });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  
  const getAllStores = async (req, res) => {
    try {
      const stores = await Store.find();
      res.status(200).json(stores);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const getStoresByUserId = async (req, res) => {
    const { userID } = req.params;
  
    try {
      const stores = await Store.find({ userID });
      res.status(200).json(stores);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateStore = async (req, res) => {
    const { storeId } = req.params;
    const { name, address, ownerName, email, contact } = req.body;
  
    try {
      const updatedStore = await Store.findByIdAndUpdate(storeId, {
        name,
        address,
        ownerName,
        email,
        contact
      }, { new: true });
  
      if (!updatedStore) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteStore = async (req, res) => {
    const { storeId } = req.params;
  
    try {
      const deletedStore = await Store.findByIdAndDelete(storeId);
  
      if (!deletedStore) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    createStore,
    getAllStores,
    getStoresByUserId,
    updateStore,
    deleteStore
  };