import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as MainFont } from 'next/font/google'
import { cn } from '@/lib/utils'
import React from "react";

import '@/app/globals.css'

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
          `${mainFont.className} ${mainFont.variable}`
        )}
      >
        {children}
      </body>
    </html>
  )
}
