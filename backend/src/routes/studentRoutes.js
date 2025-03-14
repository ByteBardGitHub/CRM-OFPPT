const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const { nom, prenom, date_naissance, chambre_id, statut } = req.body;
  try {
    const newStudent = new Student({ nom, prenom, date_naissance, chambre_id, statut });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const { nom, prenom, date_naissance, chambre_id, statut } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.nom = nom;
    student.prenom = prenom;
    student.date_naissance = date_naissance;
    student.chambre_id = chambre_id;
    student.statut = statut;
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
