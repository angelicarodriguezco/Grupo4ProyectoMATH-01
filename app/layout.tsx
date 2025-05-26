import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tabla de Verdad',
  description: 'Proyecto de Estructuras Discretas',
  generator: 'Tabla de Verdad',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
