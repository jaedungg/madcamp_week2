import { useEffect, useRef, useState } from 'react';

interface CommentModalProps {
  commentOpen: boolean;
  setCommentOpen: (open: boolean) => void;
  comments: Array<{
    _id: string;
    author: {
      profileImage?: string;
      nickname?: string;
      name: string;
    };
    createdAt: string;
    content: string;
  }>;
  onSend: (comment: string) => void;
}

export default function CommentModal({ commentOpen, setCommentOpen, comments, onSend }: CommentModalProps) {
  const [newComment, setNewComment] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!newComment.trim()) return;
    onSend(newComment);      // 부모-컴포넌트로 댓글 내용 전달 (API 호출 등)
    setNewComment('');       // 입력창 초기화
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setCommentOpen(false);
      }
    };

    if (commentOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [commentOpen, setCommentOpen]);

  return (
    <>
      {commentOpen && (
        <div 
          ref={modalRef}
          className="absolute right-4 top-32 w-[25vw] bg-[#666666] rounded-xl flex flex-col p-4 z-50"
        >
          {/* ---------- 헤더 영역 ---------- */}
          <div className="flex flex-row justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Comments</h2>
            <img
              src="/icons/close.svg"
              className="h-4 w-4 rounded m-2 hover:opacity-50 cursor-pointer"
              onClick={() => setCommentOpen(false)}
            />
          </div>

          {/* ---------- 댓글 리스트 ---------- */}
          <div className="max-h-[50vh] overflow-y-auto pr-1 scrollbar-hide">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="flex flex-row p-4 max-w-[25vw] bg-white/70 rounded-xl mb-2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
              >
                <img
                  src={comment.author.profileImage || '/images/profile.png'}
                  // src={'/images/banner.jpg'}
                  alt={comment.author.nickname}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-black">{comment.author.nickname || comment.author.name}</span>
                    <span className="text-sm text-black/40">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-black/70 break-words leading-tight">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ▼▼▼   댓글 입력 영역   ▼▼▼ */}
          <div className="mt-3 relative w-full max-w-md">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full px-4 pr-10 py-2 rounded-2xl text-black/70 text-sm bg-white/70 placeholder-gray-400 focus:outline-none drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-40 hover:opacity-70 transition"
              aria-label="Send comment"
            >
              <img src="/icons/send.svg" alt="send icon" className="w-6 h-6 mb-0.5 cursor-pointer" />
            </button>
          </div>
          {/* ▲▲▲   댓글 입력 영역   ▲▲▲ */}
        </div>
      )}
    </>
  );
}