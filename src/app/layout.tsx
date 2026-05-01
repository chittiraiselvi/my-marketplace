// src/app/layout.tsx
import './globals.css'
import Navbar from '..Navbar/components/layout/Navbar'

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