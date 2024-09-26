// Import the Product model
const Product = require('../models/Product');

// Controller to get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products from the database
    res.json(products); // Send the products as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error response if there is an issue
  }
};

// Controller to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find product by ID
    if (product) {
      res.json(product); // Send the product as a JSON response
    } else {
      res.status(404).json({ message: 'Product not found' }); // Send 404 if product not found
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error response if there is an issue
  }
};

// Controller to create a new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      imageUrl
    });

    const createdProduct = await product.save(); // Save the new product to the database
    res.status(201).json(createdProduct);        // Send the created product as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error response if there is an issue
  }
};

// Controller to update a product by ID (UPDATE)
exports.updateProduct = async (req, res) => {
    try {
      const { name, description, price, stock, imageUrl } = req.body;
  
      const product = await Product.findById(req.params.id);
  
      if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.imageUrl = imageUrl || product.imageUrl;
  
        const updatedProduct = await product.save(); // Save the updated product
        res.json(updatedProduct); // Send the updated product as a JSON response
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Controller to delete a product by ID (DELETE)
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (product) {
        await product.remove(); // Remove the product from the database
        res.json({ message: 'Product removed' }); // Send a success message
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };