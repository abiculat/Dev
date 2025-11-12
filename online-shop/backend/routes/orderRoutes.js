const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/nearby', authMiddleware, orderController.getOrdersNearLocation);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id', authMiddleware, orderController.updateOrderStatus);
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;
