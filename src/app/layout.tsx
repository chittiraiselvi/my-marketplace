import './globals.css'
import Navbar from '../components/layout/Navbar'

export const metadata = {
  title: 'MyMarket',
  description: 'Multi-vendor marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
