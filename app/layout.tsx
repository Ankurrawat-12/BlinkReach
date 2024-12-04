import './globals.css'
import { inter } from '../fonts'

export const metadata = {
  title: 'TheEmailMafia',
  description: 'Dominate the Inbox Game with Elite Email Marketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}