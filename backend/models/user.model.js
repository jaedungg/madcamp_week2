import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String },
  googleId: { type: String },
  profileImage: { type: String },
  bannerImage: { type: String }, 
  favoriteGenres: [{ type: String }], // 예: ["Action", "Drama"]
  likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  isAdmin: { type: Boolean, default: false },
  language: { type: String, default: 'ko' }
}, { timestamps: true });


export const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;