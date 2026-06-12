import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import ordersRoutes from './routes/orders.js';
import techniciansRoutes from './routes/technicians.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MongoDB Connection (optional for testing)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('⚠️ MongoDB Connection Error:', err.message));
} else {
  console.log('⚠️ MONGODB_URI not configured - running in demo mode');
}

// Test Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: '✅ Server is working!',
    port: PORT,
    baseUrl: `http://localhost:${PORT}`
  });
});

// API Routes
try {
  app.use('/api/auth', authRoutes);
  app.use('/api/orders', ordersRoutes);
  app.use('/api/technicians', techniciansRoutes);
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
}

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Server Starting...');
  console.log('='.repeat(50));
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`📱 Open in browser: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`⚙️ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50) + '\n');
}).on('error', (err) => {
  console.error('❌ Server Error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error(`Try: kill -9 $(lsof -ti:${PORT}) # Linux/Mac`);
    console.error(`Or use a different PORT: PORT=3001 npm start`);
  }
});
