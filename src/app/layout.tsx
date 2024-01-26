import "@/app/globals.css"

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as MainFont } from 'next/font/google'
import React, { Suspense } from "react";

import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils"

const mainFont = MainFont({
	subsets: ['latin'],
	variable: '--font-main',
})

export const metadata: Metadata = {
	title: 'One Study Interviews.',
	description: '',
	metadataBase: new URL('https://interview.onestudy.ai/'),
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-white dark:bg-black",
					`${mainFont.className} ${mainFont.variable}`
				)}
			>
				<Suspense fallback={null}>
					<Providers
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</Providers>
				</Suspense>
				<Analytics />
			</body>
		</html>
	)
}
