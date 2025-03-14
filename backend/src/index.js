const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const reclamationRoutes = require('./routes/reclamationRoutes');
const fournisseurRoutes = require('./routes/fournisseurRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/login', authRoutes);
app.use('/api/users', authenticateJWT, userRoutes);
app.use('/api/reclamations', authenticateJWT, reclamationRoutes);
app.use('/api/fournisseurs', authenticateJWT, fournisseurRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
