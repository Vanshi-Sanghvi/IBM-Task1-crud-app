// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// In-memory data storage
let students = [
  { id: 1, name: "Vanshi", dept: "CSBS", age: 20 },
  { id: 2, name: "sejal", dept: "CSBS", age: 19 }
];

// READ: Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// READ: Get single student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// CREATE: Add a new student
app.post('/students', (req, res) => {
  const { name, dept, age } = req.body;
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    dept,
    age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// UPDATE: Update a student by ID
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, dept, age } = req.body;
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = name || student.name;
    student.dept = dept || student.dept;
    student.age = age || student.age;
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// DELETE: Remove a student by ID
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    const deletedStudent = students.splice(index, 1);
    res.json(deletedStudent[0]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});