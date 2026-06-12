import express from 'express';
import Order from '../models/Order.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { service, description, address, latitude, longitude, scheduledDate, priority } = req.body;
    const order = new Order({
      customerId: req.user.id,
      service,
      description,
      address,
      latitude,
      longitude,
      scheduledDate,
      priority
    });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).populate('technicianId', 'name rating');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/available', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ status: 'جديد' }).populate('customerId', 'name phone address');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/accept', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { technicianId: req.user.id, status: 'تم القبول' },
      { new: true }
    );
    res.json({ message: 'Order accepted', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/rate', authMiddleware, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { customerRating: rating, customerReview: review },
      { new: true }
    );
    res.json({ message: 'Order rated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
