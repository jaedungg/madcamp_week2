import mongoose from 'mongoose';


const CommentSchema = new mongoose.Schema({
  movieId: { type: Number }, // 소문자 'number' -> 대문자 'Number'
  level: { type: Number, default: 1 },
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }]
});


const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;