const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticate = require('./middleware/authenticate');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/eco', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name:String,
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

const Message = mongoose.model('Message', messageSchema);

const User = mongoose.model('User', UserSchema);
const Cart = mongoose.model('Cart', CartSchema);

app.post('/api/register', async (req, res) => {
  const { name,email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use' });
    }

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name,email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
app.put('/api/update-user', async (req, res) => {
  const { email, name } = req.body;
  console.log(email,name,'update place')
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
  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.send({ token,user});
});
app.get('/api/user', async (req, res) => {'probs is here'
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user)
  res.send({ user });})
app.use('/api/cart', require('./routes/cart'));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  // Save message to database
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
