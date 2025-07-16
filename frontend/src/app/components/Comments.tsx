import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';


interface CommentModalProps {
  commentOpen: boolean;
  setCommentOpen: (open: boolean) => void;
  comments: Array<{
    _id: string;
    author: {
      _id: string;
      profileImage?: string;
      nickname?: string;
      name: string;
    };
    createdAt: string;
    content: string;
  }>;
  onSend: (comment: string) => void;
  onDelete: (commentId: string) => void; // Optional delete handler
}

export default function CommentModal({ commentOpen, setCommentOpen, comments, onSend, onDelete }: CommentModalProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

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
          {comments.length === 0 && (
            <div className="text-white/40 text-sm text-center mb-2">
            ⚠️ No comments yet. Be the first to comment!
            </div>
          )}
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
                <div className="flex w-full flex-col ml-3">
                  <div className="flex w-full items-center justify-between gap-2 mb-1">
                    <div className='flex flex-row items-center gap-2'>
                      <span className="font-semibold text-black">{comment.author.nickname || comment.author.name}</span>
                      <span className="text-sm text-black/40">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-black/70 break-words leading-tight">{comment.content}</p>
                </div>
                {/* 삭제 버튼 */}
                {(session?.user?.id === comment.author._id) && (
                  <div onClick={(e) => onDelete(comment._id)} className='flex flex-wrap h-3 text-black/40 hover:text-red-500 transition-colors duration-200 cursor-pointer'>
                   <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                 </div>
                )}

              </div>
            ))}
          </div>

          {/* ▼▼▼   댓글 입력 영역   ▼▼▼ */}
          <div className="mt-3 relative w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = newComment.trim();
                if (value) {
                  onSend(value);
                  setNewComment('');
                }
              }}
            >
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 pr-10 py-2 rounded-2xl text-white text-sm border border-white/70 placeholder-gray-400 focus:outline-none drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
              />
              <button
                type='submit'
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-70 hover:opacity-100 transition"
                aria-label="Send comment"
              >
                <img src="/icons/send.svg" alt="send icon" className="w-6 h-6 mb-0.5 cursor-pointer" />
              </button> 
            </form>
          </div>
          {/* ▲▲▲   댓글 입력 영역   ▲▲▲ */}
        </div>
      )}
    </>
  );
}