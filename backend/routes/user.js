const router = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const authMiddleware = require('../middelware/authen');
const uploadMiddleware = require('../middelware/upload');
const { getUser, listUser, updateUser, registerUser, authenticateUser } = require('../services/user');

const SECRET = process.env.SECRET || "test-dev-secret";

router.post('/register', async (req, res) => {
  const { email, password, confirm_password } = req.body;
  try {
    res.status(200).json(await registerUser(email, password, confirm_password));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    const token = jwt.sign(user, SECRET, { expiresIn: '24h' });
    res.status(200).json({ user, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/authenticated', authMiddleware, async (req, res) => {
  const token = req.get('Authorization');
  const user = jwt.verify(token, SECRET);
  try {
    res.status(200).json(await getUser(user.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/get/:user_id', authMiddleware, async (req, res) => {
  const { user_id } = req.params;
  try {
    res.status(200).json(await getUser(user_id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:user_id', uploadMiddleware.single('profile_picture'), authMiddleware, async (req, res) => {
  const input = req.body;
  if (req.file) {
    input.profile_picture = req.file.filename;
  }
  const { user_id } = req.params;
  try {
    res.status(200).json(await updateUser(user_id, input));
  } catch (error) {
    res.status(400).json({ message: error.message });
  };
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    res.status(200).json(await listUser());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;