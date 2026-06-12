import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get technician profile
router.get('/:id', async (req, res) => {
  try {
    const technician = await User.findById(req.params.id).select('-password');
    if (!technician) return res.status(404).json({ message: 'Technician not found' });
    res.json(technician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get technician orders
router.get('/:id/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ technicianId: req.params.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all technicians
router.get('/', async (req, res) => {
  try {
    const technicians = await User.find({ role: 'technician', isActive: true }).select('-password');
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
