import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aplicación en Next',
  description: 'Componentes de nextui utilizando API personas local',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar titulo='Personas'/>
        {children}
        <Footer organismo='Poder Judicial de Río Negro'/>
      </body>
    </html>
  )
}
