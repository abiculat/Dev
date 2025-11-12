const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, quantity, category, image } = req.body;

    // Validation
    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate final price with discount
    const finalPrice = price - (price * discount / 100);

    const product = new Product({
      name,
      description,
      price,
      discount,
      finalPrice,
      quantity,
      category,
      inStock: quantity > 0,
      image
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, discount, quantity, category, inStock, image } = req.body;

    // Find product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (quantity !== undefined) product.quantity = quantity;
    if (category) product.category = category;
    if (inStock !== undefined) product.inStock = inStock;
    if (image) product.image = image;

    // Recalculate final price
    if (price || discount !== undefined) {
      product.finalPrice = product.price - (product.price * product.discount / 100);
    }

    product.updatedAt = Date.now();

    await product.save();

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
