'use client';

import { useSession, signOut } from 'next-auth/react'

export default function UserProfile() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>로딩 중...</p>
  if (!session) return null

  const { user } = session

  return (
    <div className="mb-6 text-center">
      <p className="mb-2 font-medium">👤 {user?.name}</p>
      <p className="mb-2 text-sm text-gray-600">{user?.email}</p>
      <img
        src={user?.image ?? ''}
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-2"
      />
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        로그아웃
      </button>
    </div>
  )
}