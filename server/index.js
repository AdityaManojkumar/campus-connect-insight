import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-connect-insight';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  semester: { type: String, required: true },
  college: { type: String, required: true },
  branch: { type: String, required: true },
  skills: [{ type: String }],
  subjects: [{ type: String }],
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      password: hashedPassword,
      email
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get student details
app.get('/api/student/:userId', authenticateToken, async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) {
      return res.status(404).json({ message: 'Student details not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Save/Update student details
app.post('/api/student', authenticateToken, async (req, res) => {
  try {
    const { name, dob, semester, college, branch, skills, subjects } = req.body;
    const userId = req.user.userId;

    let student = await Student.findOne({ userId });

    if (student) {
      // Update existing student
      student.name = name;
      student.dob = dob;
      student.semester = semester;
      student.college = college;
      student.branch = branch;
      student.skills = skills || [];
      student.subjects = subjects || [];
      student.updatedAt = new Date();
    } else {
      // Create new student
      student = new Student({
        userId,
        name,
        dob,
        semester,
        college,
        branch,
        skills: skills || [],
        subjects: subjects || []
      });
    }

    await student.save();
    res.json({ message: 'Student details saved successfully', student });
  } catch (error) {
    console.error('Save student error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update skills
app.put('/api/student/:userId/skills', authenticateToken, async (req, res) => {
  try {
    const { skills } = req.body;
    const userId = req.params.userId;

    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.skills = skills;
    student.updatedAt = new Date();
    await student.save();

    res.json({ message: 'Skills updated successfully', skills: student.skills });
  } catch (error) {
    console.error('Update skills error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update subjects
app.put('/api/student/:userId/subjects', authenticateToken, async (req, res) => {
  try {
    const { subjects } = req.body;
    const userId = req.params.userId;

    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.subjects = subjects;
    student.updatedAt = new Date();
    await student.save();

    res.json({ message: 'Subjects updated successfully', subjects: student.subjects });
  } catch (error) {
    console.error('Update subjects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 MongoDB connected to: ${MONGODB_URI}`);
}); 