# 🔧 أسطة عراقي - Ostaa Iraqi

منصة عراقية متكاملة للخدمات المنزلية وإدارة الحرفيين

## 🚀 البدء السريع

### المتطلبات
- Node.js (v14+)
- MongoDB
- npm

### التثبيت

1. استنساخ المشروع:
```bash
git clone https://github.com/hh0905396-spec/ostaa-iraqi.git
cd ostaa-iraqi
```

2. تثبيت الحزم:
```bash
npm install
```

3. إنشاء ملف `.env`:
```bash
cp .env.example .env
```

4. تشغيل السيرفر:
```bash
npm start
```

## 📋 الميزات الأساسية

### للعملاء
- ✅ إنشاء حساب والدخول
- ✅ طلب خدمة جديدة
- ✅ متابعة الطلبات
- ✅ تقييم الفني

### للفنيين
- ✅ التسجيل والدخول
- ✅ عرض الطلبات المتاحة
- ✅ قبول المهام
- ✅ تحديث حالة الطلب

### للمدير
- ✅ لوحة تحكم شاملة
- ✅ إدارة الطلبات والعملاء والفنيين
- ✅ إدارة الدفع
- ✅ عرض الإحصائيات

## 🔌 API الأساسي

### تسجيل ودخول
- `POST /api/auth/register` - تسجيل عضو جديد
- `POST /api/auth/login` - دخول
- `GET /api/auth/me` - بيانات المستخدم

### الطلبات
- `POST /api/orders` - إنشاء طلب
- `GET /api/orders/my-orders` - طلباتي
- `GET /api/orders/available` - الطلبات المتاحة
- `PUT /api/orders/:id/accept` - قبول طلب
- `PUT /api/orders/:id/status` - تحديث الحالة
- `PUT /api/orders/:id/rate` - تقييم

### الإدارة
- `GET /api/admin/dashboard` - لوحة التحكم
- `GET /api/admin/orders` - جميع الطلبات
- `GET /api/admin/customers` - العملاء
- `GET /api/admin/technicians` - الفنيين
- `PUT /api/admin/orders/:id/payment` - تحديث الدفع

## 📁 هيكل المشروع

```
ostaa-iraqi/
├── models/
├── routes/
├── middleware/
├── server.js
├── package.json
└── README.md
```

---

**جميع الحقوق محفوظة © 2024**
