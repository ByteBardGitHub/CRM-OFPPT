const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Reclamation = require('../models/Reclamation');
const Fournisseur = require('../models/Fournisseur');

mongoose.connect('mongodb://localhost:27017/crmofppt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

  const users = [
    {
      nom: 'Admin',
      prenom: 'User',
      email: 'admin@gmail.com',
      mot_de_passe: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      date_creation: new Date(),
      date_modification: new Date()
    },
    {
      nom: 'Jane',
      prenom: 'Doe',
      email: 'jane.doe@example.com',
      mot_de_passe: bcrypt.hashSync('password123', 10),
      role: 'user',
      date_creation: new Date(),
      date_modification: new Date()
    }
  ];

  const reclamations = [
    {
      user_id: null, // will be set after user creation
      sujet: 'Room Cleaning',
      description: 'The room was not cleaned properly.',
      statut: 'en attente',
      date_creation: new Date()
    }
  ];

  const fournisseurs = [
    {
      nom: 'Supplier One',
      contact: '123456789',
      adresse: '123 Main St',
      email: 'supplier1@example.com',
      date_creation: new Date()
    }
  ];

  User.insertMany(users).then(userDocs => {
    console.log('Users added');
    reclamations[0].user_id = userDocs[1]._id; // linking reclamation to Jane Doe
    return Reclamation.insertMany(reclamations);
  }).then(() => {
    console.log('Reclamations added');
    return Fournisseur.insertMany(fournisseurs);
  }).then(() => {
    console.log('Fournisseurs added');
    mongoose.connection.close();
  }).catch(err => {
    console.error('Error adding data:', err);
    mongoose.connection.close();
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
