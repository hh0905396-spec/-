import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalTechnicians = await User.countDocuments({ role: 'technician' });
    const completedOrders = await Order.countDocuments({ status: 'مكتمل' });
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$finalCost' } } }
    ]);

    res.json({
      totalOrders,
      totalCustomers,
      totalTechnicians,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name phone')
      .populate('technicianId', 'name phone');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/customers', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password');
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/technicians', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const technicians = await User.find({ role: 'technician' }).select('-password');
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/orders/:id/payment', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { paymentStatus, finalCost } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, finalCost },
      { new: true }
    );
    res.json({ message: 'Payment updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
