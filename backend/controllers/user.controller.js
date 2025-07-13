import User from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('_id email nickname') // 필요한 필드만 선택
      .lean(); // Mongoose 문서가 아닌 일반 객체로 반환
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    console.error("❌ 전체 사용자 조회 실패:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 필요한 필드만 추출
    const {
      _id,
      email,
      nickname,
      profileImage,
      favoriteGenres,
      likedMovies,
      language,
    } = user;

    res.json({
      _id,
      email,
      nickname,
      profileImage,
      favoriteGenres,
      likedMovies,
      language,
    });
  } catch (err) {
    console.error("❌ 사용자 조회 실패:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('nickname profileImage favoriteGenres likedMovies');

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      nickname: user.nickname,
      profileImage: user.profileImagem,
      favoriteGenres: user.favoriteGenres,
      likedMovies: user.likedMovies.map(movie => movie.title), // ObjectId를 문자열로 변환
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
};

const createUserProfile = async (req, res) => {
  try {
    const { email, nickname, profileImage, favoriteGenres, language } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: '이미 등록된 이메일입니다.' });

    const newUser = new User({
      email,
      nickname,
      profileImage,
      favoriteGenres,
      language,
    });

    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const updated = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updated) return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getAllUsers, getMyProfile, getUserProfile, createUserProfile, updateUserProfile, deleteUserProfile };