import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 사용자 이름
  email: { type: String, required: true, unique: true },
  nickname: { type: String },
  profileImage: { type: String },
  bannerImage: { type: String }, 
  favoriteGenres: [{ type: String }], // 예: ["Action", "Drama"]
  likedMovies: [{ type: Number }], // TMDB 기준 영화 ID
  recentMovies: [{ type: Number }], // 최근 본 영화 TMDB 기준 ID
  isAdmin: { type: Boolean, default: false },
  language: { type: String, default: 'ko' }
}, { timestamps: true });


export const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;