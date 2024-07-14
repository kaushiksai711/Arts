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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
