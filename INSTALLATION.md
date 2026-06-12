# تعليمات البدء - أسطة عراقي

## 📋 المتطلبات

- Node.js v14 أو أحدث
- MongoDB محلي أو في السحابة
- npm أو yarn

## 🚀 خطوات التثبيت

### 1. استنساخ المشروع
```bash
git clone https://github.com/hh0905396-spec/ostaa-iraqi.git
cd ostaa-iraqi
```

### 2. تثبيت الحزم
```bash
npm install
```

### 3. إعداد متغيرات البيئة
```bash
cp .env.example .env
```

ثم عدّل ملف `.env` وأضف بيانات MongoDB الخاصة بك:
```
MONGODB_URI=mongodb://localhost:27017/ostaa-iraqi
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. تشغيل السيرفر
```bash
npm start
```

السيرفر سيعمل على `http://localhost:5000`

## 🔌 نقاط النهاية (API)

### المصادقة
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - دخول المستخدم
- `GET /api/auth/me` - الحصول على بيانات المستخدم الحالي

### الطلبات
- `POST /api/orders` - إنشاء طلب جديد
- `GET /api/orders/my-orders` - الحصول على طلباتي
- `GET /api/orders/available` - الحصول على الطلبات المتاحة
- `PUT /api/orders/:id/accept` - قبول الطلب
- `PUT /api/orders/:id/status` - تحديث حالة الطلب
- `PUT /api/orders/:id/rate` - تقييم الطلب

### الفنيين
- `GET /api/technicians` - الحصول على جميع الفنيين
- `GET /api/technicians/:id` - الحصول على بيانات فني
- `GET /api/technicians/:id/orders` - الحصول على طلبات فني

### الإدارة (Admin)
- `GET /api/admin/dashboard` - لوحة التحكم
- `GET /api/admin/orders` - جميع الطلبات
- `GET /api/admin/customers` - جميع العملاء
- `GET /api/admin/technicians` - جميع الفنيين
- `PUT /api/admin/orders/:id/payment` - تحديث حالة الدفع

## 🏗️ هيكل المشروع

```
ostaa-iraqi/
├── models/
│   ├── User.js           # نموذج المستخدم
│   └── Order.js          # نموذج الطلب
├── routes/
│   ├── auth.js           # طرق المصادقة
│   ├── orders.js         # طرق الطلبات
│   ├── technicians.js    # طرق الفنيين
│   └── admin.js          # طرق الإدارة
├── middleware/
│   ├── auth.js           # middleware المصادقة
│   └── errorHandler.js   # معالج الأخطاء
├── server.js             # ملف السيرفر الرئيسي
├── index.html            # الواجهة الأمامية
├── package.json          # الحزم المطلوبة
├── .env.example          # مثال على متغيرات البيئة
└── README.md             # هذا الملف
```

## 🔐 الأمان

- جميع كلمات المرور مشفرة باستخدام `bcryptjs`
- المصادقة باستخدام `JWT` (JSON Web Token)
- التحقق من الصلاحيات حسب الدور (Role-based Access)

## 📱 الواجهة الأمامية

الواجهة الأمامية متضمنة في ملف `index.html` وتحتوي على:
- صفحة تسجيل للعملاء
- صفحة تسجيل للفنيين
- صفحة دخول للمدير
- عرض جميع الخدمات المتاحة

## 🛠️ الخدمات المتاحة

1. **⚡ كهرباء** - تصليح وصيانة الأجهزة الكهربائية
2. **🚰 صحيات** - تصليح وتركيب أنابيب المياه
3. **🎨 صبغ** - صبغ الجدران والديكور الداخلي
4. **🧹 تنظيف** - تنظيف المنازل والمكاتب
5. **🏠 ديكور** - تصميم وتشطيب الديكور الداخلي

## 📊 حالات الطلب

- `جديد` - الطلب لم يتم قبوله بعد
- `قيد المراجعة` - الطلب قيد المراجعة
- `تم القبول` - الطلب تم قبوله من قبل الفني
- `جاري التنفيذ` - الفني يعمل على الطلب
- `مكتمل` - الطلب اكتمل
- `ملغى` - الطلب تم إلغاؤه

## 💬 التواصل والدعم

للمساعدة والدعم، يرجى التواصل على:
- 📧 البريد الإلكتروني: support@ostaa-iraqi.com
- 📱 الهاتف: +964-XXX-XXXX

## 📝 الترخيص

جميع الحقوق محفوظة © 2024 أسطة عراقي

---

**ملاحظة:** هذا المشروع لا يزال في مرحلة التطوير، وقد تتم إضافة ميزات جديدة قريباً.
