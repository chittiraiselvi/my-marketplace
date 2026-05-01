// src/app/layout.tsx
import './globals.css'
import Navbar from '@/components/layout/navbar'

export default function RootLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <html lang="ta">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}