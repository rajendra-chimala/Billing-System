const Product = require("../Model/Product");

const createProduct = async (req, res) => {
  const { productName, productImage, productPrice, productQuantity } = req.body;
  const userID = req.user.userId;

  try {
    const user = await User.findById(userID);
    if (!user || !user.storeID) {
      return res.status(404).json({ error: "User or store not found" });
    }

    const storeID = user.storeID;

    const newProduct = new Product({
      productName,
      productImage,
      productPrice,
      productQuantity,
      storeID,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("storeID", "name address");
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { productName, productImage, productPrice, productQuantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { productName, productImage, productPrice, productQuantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
