// _app.tsx or _app.js
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}