import e from 'cors';
import mongoose from 'mongoose';

const ComicSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  level: { type: Number, required: true, enum: [1, 2] }, 
  title: { type: String },        // 만화 제목 (선택)
  language: { type: String, default: 'ko' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "6871f9ca6c4358dc98b3ca4b" }, // 만든 유저 (선택)
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const ComicStepSchema = new mongoose.Schema({
  comic: { type: mongoose.Schema.Types.ObjectId, ref: 'Comic', required: true },
  stepNumber: { type: Number, required: true },
  imageUrl: { type: String }, // 각 컷의 이미지
  text: { type: String },     // 대사나 설명
  // audioUrl: { type: String }, // TTS 음성 경로 (선택)
}, { timestamps: true });


const Comic = mongoose.models.Comic || mongoose.model('Comic', ComicSchema);
const ComicStep = mongoose.models.ComicStep || mongoose.model('ComicStep', ComicStepSchema);

export default {
  Comic,
  ComicStep,
};