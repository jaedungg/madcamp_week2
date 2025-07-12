const User = require('../models/user.model');

// 모든 유저 가져오기
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// 유저 생성
exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  const saved = await newUser.save();
  res.status(201).json(saved);
};

// 유저 ID로 조회
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
