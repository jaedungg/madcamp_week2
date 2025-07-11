// src/app/page.tsx 또는 src/app/components/LoginButton.tsx

'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
  return (
    <button onClick={() => signIn('google')}>
      구글 로그인
    </button>
  )
}