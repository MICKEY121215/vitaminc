const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const getRazorpay = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// POST /api/orders - Create order & Razorpay payment
router.post('/', auth, async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    // Create order in database
    const order = new Order({
      userId: req.userId,
      products,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending'
    });

    await order.save();

    // Create Razorpay order
    try {
      const razorpay = getRazorpay();
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100), // amount in paisa
        currency: 'INR',
        receipt: order._id.toString(),
        notes: {
          orderId: order._id.toString()
        }
      });

      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      res.status(201).json({
        message: 'Order created',
        order,
        razorpayOrder: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency
        }
      });
    } catch (razorpayError) {
      // If Razorpay fails, still return the order (for demo purposes)
      console.log('Razorpay not configured, using demo mode:', razorpayError.message);
      order.paymentStatus = 'completed';
      order.razorpayOrderId = 'demo_' + Date.now();
      await order.save();

      // Clear user's cart after successful order
      await Cart.findOneAndDelete({ userId: req.userId });

      res.status(201).json({
        message: 'Order created (demo mode - Razorpay not configured)',
        order,
        demoMode: true
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/orders/verify - Verify Razorpay payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update order status
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = 'completed';
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();

    // Clear user's cart after successful payment
    await Cart.findOneAndDelete({ userId: req.userId });

    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/orders/user - Get user's orders
router.get('/user', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('products.productId');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
