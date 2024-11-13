const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Ensure this path is correct
const supplierRoutes = require('./routes/supplierRoutes'); // Ensure this path is correct
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mern-vite-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });


// Routes
app.use('/api/suppliers', supplierRoutes);

app.use('/api/inventory', inventoryRoutes);

app.use('/api/sales', salesRoutes);

app.use('/api/reports', reportsRoutes);

// Routes
app.use('/api/employees', employeeRoutes);


// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.post('/api/logout', (req, res) => {
  // Clear the token on the server-side (if using server-side sessions)
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
});

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: String,
  productName: String,
  quantity: Number,
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);

// API to handle order creation
app.post('/api/orders', async (req, res) => {
  const { customerName, productName, quantity, price } = req.body;

  try {
    const newOrder = new Order({ customerName, productName, quantity, price });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// API to get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// API to update an order
app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.customerName = req.body.customerName || order.customerName;
      order.productName = req.body.productName || order.productName;
      order.quantity = req.body.quantity || order.quantity;
      order.price = req.body.price || order.price;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API to delete an order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
