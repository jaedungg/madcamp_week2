import User from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('_id name email nickname') // 필요한 필드만 선택
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    console.error("전체 사용자 조회 실패:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('사용자 정보 조회 실패:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('nickname profileImage bannerImage favoriteGenres likedMovies');

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      nickname: user.nickname,
      profileImage: user.profileImagem,
      bannerImage: user.bannerImage,
      favoriteGenres: user.favoriteGenres,
      likedMovies: user.likedMovies, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
};

const createUserProfile = async (req, res) => {
  try {
    const {
      email,
      name,
      nickname,
      profileImage = '',
      bannerImage = '',
      favoriteGenres = [],
      language = 'ko', // 기본 언어 설정 (예: 'ko')
    } = req.body;

    // 필수 값 검증
    if (!email || !nickname) {
      return res.status(400).json({ error: 'email과 nickname은 필수입니다.' });
    }

    // 이메일 중복 확인
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: '이미 등록된 이메일입니다.' });
    }

    // 새 유저 생성
    const newUser = new User({
      email,
      name,
      nickname,
      profileImage,
      bannerImage,
      favoriteGenres,
      likedMovies: [],
      recentMovies: [],
      isAdmin: false,
      language,
    });

    const savedUser = await newUser.save();

    // 저장된 사용자 정보 응답 (필요하다면 필드 필터링 가능)
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('사용자 생성 실패:', err.message);
    res.status(500).json({ error: 'Internal server error' });
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