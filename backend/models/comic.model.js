import mongoose from 'mongoose';

const ComicSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  type: { type: String, enum: ['summary', 'parody'], required: true }, // 예: 'summary' or 'parody'
  title: { type: String },        // 만화 제목 (선택)
  description: { type: String },  // 간략 설명
  language: { type: String, default: 'ko' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 만든 유저 (선택)
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const ComicStepSchema = new mongoose.Schema({
  comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comic', required: true },
  stepNumber: { type: Number, required: true },
  imageUrl: { type: String }, // 각 컷의 이미지
  text: { type: String },     // 대사나 설명
  audioUrl: { type: String }, // TTS 음성 경로 (선택)
}, { timestamps: true });



// export const User = mongoose.models.User || mongoose.model('User', UserSchema);
// export const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
// export const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);
const Comic = mongoose.models.Comic || mongoose.model('Comic', ComicSchema);
const ComicStep = mongoose.models.ComicStep || mongoose.model('ComicStep', ComicStepSchema);

export default {
  Comic,
  ComicStep,
  // User,
  // Comment,
  // Movie
};