const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
const corsOptions = {
  origin: 'https://rococo-valkyrie-618624.netlify.app/',
  methods: ['GET', 'POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type'],
};


const paymentRoutes = require('./routes/Payment');
const multer = require('multer'); 
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const authenticate = require('./middleware/authenticate');
const MONGODB_URI=process.env.MONGODB_URI
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.JWT_SECRET)
app.use(cors('*'));
app.use(bodyParser.json());
app.use(express.json());

console.log('MONGODB_URI:',`${MONGODB_URI}`); 
app.use('/api/payment', paymentRoutes);


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const CartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: String,
  quantity: Number,
});

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  replies: [
    {
      name: String,
      email: String,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  timestamp: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  dimensions: { type: String, required: true },
  materials: { type: String, required: true },
  count: { type: Number, required: true }
});

const Product = mongoose.model('Product5', productSchema);
const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', UserSchema);
const Cart = mongoose.model('Cart', CartSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const storedFileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, storedFileName);
  }
});

const upload = multer({ storage: storage });

app.post('/api/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.put('/api/update-user', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.name = name;
    await user.save();
    res.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token, user });
});

app.get('/api/user', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  res.send({ user });
});

app.use('/api/cart', require('./routes/cart'));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = new Message({ name, email, message });
  await newMessage.save();
  res.status(200).json({ message: 'Form submitted successfully.' });
});

app.get('/api/messages', async (req, res) => {
  const messages = await Message.find({});
  res.status(200).json(messages);
});

app.post('/api/messages/:id/reply', async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;
  const reply = { name, email, message };
  try {
    const msg = await Message.findById(id);
    msg.replies.push(reply);
    await msg.save();
    res.status(200).json({ message: 'Reply added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the reply.' });
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  const { title, artist, email, description, price, type, dimensions, materials, count } = req.body;
  const image = req.file;
  if (!image) {
    return res.status(400).json({ message: 'Image file is required' });
  }
  try {
    const newProduct = new Product({
      title,
      artist,
      email,
      description,
      price,
      type,
      image: image.filename,
      dimensions,
      materials,
      count
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use('/uploads', express.static('uploads'));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/selling', async (req, res) => {
  const { Email } = req.query; 
  try {
    const products = await Product.find({ email: Email });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
