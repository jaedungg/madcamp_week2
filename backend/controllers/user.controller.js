import User from "../models/user.model.js";

const getUserById = async (req, res) => {
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

export default { getUserById };