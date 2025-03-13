const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Define the User model with fullName and role fields
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/ofpptcrm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Database');
});

// Insert demo admin user
const insertDemoUser = async () => {
  try {
    const adminUser = new User({
      email: "admin@example.com",
      password: "admin123",
      fullName: "Admin User",
      role: "admin",
    });
    await adminUser.save();
    console.log('Admin user created');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Call the function to create the admin user
(async () => {
  await db.once('open', async function() {
    console.log('Connected to MongoDB Database');
    await insertDemoUser();
  });

  // Create admin user if not exists
  await User.findOne({ email: "admin@gmail.com" }, async (err, user) => {
    if (err) throw err;
    if (!user) {
      try {
        const adminUser = new User({
          email: "admin@gmail.com",
          password: "admin123",
          fullName: "Admin User",
          role: "admin",
        });
        await adminUser.save();
        console.log('Admin user created');
      } catch (error) {
        console.error('Error creating admin user:', error);
      }
    } else {
      console.log('Admin user already exists');
    }
  });
})();

// User Sign-In API
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).send('Sign-In Successful');
    } else {
      res.status(401).send('email or password is incorrect');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).send('No users found');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
