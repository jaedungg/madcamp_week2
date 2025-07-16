import Comment from "../models/comment.model.js";

const addCommentToComic = async (req, res) => {
  try {
    const { movieId, level } = req.params;
    const { content, author } = req.body;

    console.log('[POST] 댓글 요청:', { movieId, level, content, author });

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: '댓글 내용은 문자열이어야 합니다.' });
    }

    let commentDoc = await Comment.findOne({ 
      movieId: Number(movieId), 
      level: Number(level || 1) 
    });

    if (!commentDoc) {
      commentDoc = new Comment({
        movieId: Number(movieId),
        level: Number(level || 1),
        comments: [],
      });
    }

    // 댓글 객체 추가
    commentDoc.comments.push({
      author: author || '66aabbcc1122', // 인증 적용 전 임시
      content,
      likes: 0,
    });

    const saved = await commentDoc.save();
    res.status(201).json(saved.comments[saved.comments.length - 1]); // 방금 추가한 댓글 반환
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCommentsByComicId = async (req, res) => {
  try {
    const { movieId, level } = req.params;

    const commentDoc = await Comment.findOne({
      movieId: Number(movieId),
      level: Number(level || 1),
    }).populate('comments.author', 'nickname name profileImage');

    if (!commentDoc) {
      return res.status(200).json([]); // 댓글 문서가 없어도 빈 배열 반환
    }

    // 최신 순으로 정렬 (mongoose populate 내부 정렬은 flatten된 배열에 직접 안 먹힘)
    const sortedComments = commentDoc.comments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(sortedComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { movieId, level, commentId } = req.params;
    const { content, author } = req.body;

    if (!content || typeof content !== 'string' || content.length > 500) {
      return res.status(400).json({ error: '유효하지 않은 댓글 내용입니다.' });
    }

    if (!author) {
      return res.status(400).json({ error: 'author가 누락되었습니다.' });
    }

    const commentDoc = await Comment.findOne({
      movieId: Number(movieId),
      level: Number(level || 1),
    });

    if (!commentDoc) {
      return res.status(404).json({ error: '댓글 문서를 찾을 수 없습니다.' });
    }

    const target = commentDoc.comments.id(commentId);
    if (!target) {
      return res.status(404).json({ error: '해당 댓글을 찾을 수 없습니다.' });
    }

    if (target.author.toString() !== author) {
      return res.status(403).json({ error: '댓글 작성자만 수정할 수 있습니다.' });
    }

    target.content = content;
    target.updatedAt = new Date();

    await commentDoc.save();

    res.status(200).json(target);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, level, commentId } = req.params;
    const { author } = req.body;

    const commentDoc = await Comment.findOne({
      movieId: Number(movieId),
      level: Number(level || 1),
    });

    if (!commentDoc) {
      return res.status(404).json({ error: '댓글 문서를 찾을 수 없습니다.' });
    }

    const target = commentDoc.comments.id(commentId);
    if (!target) {
      return res.status(404).json({ error: '해당 댓글을 찾을 수 없습니다.' });
    }

    if (target.author.toString() !== author) {
      return res.status(403).json({ error: '댓글 작성자만 삭제할 수 있습니다.' });
    }

    target.deleteOne(); // 서브문서에서 제거
    await commentDoc.save();

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