import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  service: { type: String, enum: ['كهرباء', 'صحيات', 'صبغ', 'تنظيف', 'ديكور'], required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  scheduledDate: { type: Date, required: true },
  priority: { type: String, enum: ['منخفضة', 'متوسطة', 'عالية', 'طارئة'], default: 'متوسطة' },
  status: { type: String, enum: ['جديد', 'قيد المراجعة', 'تم القبول', 'جاري التنفيذ', 'مكتمل', 'ملغى'], default: 'جديد' },
  estimatedCost: { type: Number, default: 0 },
  finalCost: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['لم يتم', 'معلق', 'مكتمل'], default: 'لم يتم' },
  paymentMethod: { type: String, enum: ['نقدي', 'تحويل', 'أقساط'], default: 'نقدي' },
  customerRating: { type: Number, min: 1, max: 5, default: null },
  customerReview: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
