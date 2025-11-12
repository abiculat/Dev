const Order = require('../models/Order');
const Product = require('../models/Product');

// Generate order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Create order (with calculations)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, isPriority } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    // Validate and calculate order details
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.finalPrice * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.finalPrice
      });

      // Update product quantity
      product.quantity -= item.quantity;
      product.inStock = product.quantity > 0;
      await product.save();
    }

    // Calculate tax (8% of subtotal)
    const tax = subtotal * 0.08;

    // Calculate final total
    const totalAmount = subtotal + tax;

    // Create order
    const order = new Order({
      orderNumber: generateOrderNumber(),
      userId: req.userId,
      items: processedItems,
      subtotal,
      tax,
      totalAmount,
      shippingAddress,
      isPriority,
      paymentStatus: false,
      status: 'Pending'
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (Admin) or user orders
exports.getAllOrders = async (req, res) => {
  try {
    const isAdmin = req.query.isAdmin === 'true';

    let orders;
    if (isAdmin) {
      orders = await Order.find().populate('userId', 'name email').populate('items.productId', 'name price');
    } else {
      orders = await Order.find({ userId: req.userId }).populate('items.productId', 'name price');
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('items.productId', 'name price image');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.userId._id.toString() !== req.userId && req.query.isAdmin !== 'true') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        paymentStatus: paymentStatus !== undefined ? paymentStatus : undefined,
        deliveredAt: status === 'Delivered' ? new Date() : undefined
      },
      { new: true }
    ).populate('items.productId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check ownership
    if (order.userId.toString() !== req.userId && req.query.isAdmin !== 'true') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Restore product quantities
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity += item.quantity;
        product.inStock = true;
        await product.save();
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders near location (location-based service)
exports.getOrdersNearLocation = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 50 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const orders = await Order.find({
      'shippingAddress.latitude': {
        $gte: parseFloat(latitude) - 1,
        $lte: parseFloat(latitude) + 1
      },
      'shippingAddress.longitude': {
        $gte: parseFloat(longitude) - 1,
        $lte: parseFloat(longitude) + 1
      }
    }).populate('userId', 'name email').populate('items.productId', 'name');

    res.json({
      message: 'Orders near location',
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
