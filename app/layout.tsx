import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}