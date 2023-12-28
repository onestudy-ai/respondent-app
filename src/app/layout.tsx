import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as MainFont } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const mainFont = MainFont({
  subsets: ['latin'],
  variable: '--font-main',
})

export const metadata: Metadata = {
  title: 'Conversation',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "min-h-screen bg-white dark:bg-black",
          `${mainFont.className} font-sans`
        )}
      >
        {children}
      </body>
    </html>
  )
}
