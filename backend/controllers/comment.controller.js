import Comment from "../models/comment.model.js";
import models from "../models/comic.model.js";

const { Comic } = models;


const addCommentToComic = async (req, res) => {
  try {
    const { comicId } = req.params;
    const { content, author } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: '댓글 내용은 문자열이어야 합니다.' });
    }

    const comic = await Comic.findById(comicId);
    if (!comic) {
      return res.status(404).json({ error: '해당 만화를 찾을 수 없습니다.' });
    }

    const newComment = new Comment({
      comic: comicId,
      author: author || '66aabbcc1122', // 인증 적용 전 임시
      content,
    });

    const savedComment = await newComment.save();

    comic.comments = comic.comments || [];
    comic.comments.push(savedComment._id);
    await comic.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCommentsByComicId = async (req, res) => {
  try {
    const { comicId } = req.params;

    const comic = await Comic.findById(comicId)
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'nickname profileImage',
        },
        options: {
          sort: { createdAt: -1 },
        },
      });

    if (!comic) {
      return res.status(404).json({ error: '해당 만화를 찾을 수 없습니다.' });
    }
    const comments = comic.comments || [];
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { comicId, commentId } = req.params;
    const { content, author } = req.body;

    if (!comicId || !commentId) {
      return res.status(400).json({ error: 'comicId 또는 commentId가 누락되었습니다.' });
    }

    if (!content || typeof content !== 'string' || content.length > 500) {
      return res.status(400).json({ error: '유효하지 않은 댓글 내용입니다.' });
    }

    if (!author) {
      return res.status(400).json({ error: 'author가 누락되었습니다.' });
    }

    const comic = await Comic.findById(comicId);
    if (!comic) {
      return res.status(404).json({ error: '해당 만화를 찾을 수 없습니다.' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: '해당 댓글을 찾을 수 없습니다.' });
    }

    if (comment.author.toString() !== author) {
      return res.status(403).json({ error: '댓글 작성자만 수정할 수 있습니다.' });
    }

    comment.content = content;
    comment.updatedAt = new Date();

    const updated = await comment.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comicId, commentId } = req.params;
    const { author } = req.body;

    const comic = await Comic.findById(comicId);
    if (!comic) {
      return res.status(404).json({ error: '해당 만화를 찾을 수 없습니다.' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: '해당 댓글을 찾을 수 없습니다.' });
    }

    if (comment.author.toString() !== author) {
      return res.status(403).json({ error: '댓글 작성자만 삭제할 수 있습니다.' });
    }

    await comment.deleteOne();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  addCommentToComic,
  getCommentsByComicId,
  updateComment,
  deleteComment,
};