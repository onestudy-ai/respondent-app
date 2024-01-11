import type { Metadata } from 'next'
import React from "react";
import { Plus_Jakarta_Sans as MainFont } from 'next/font/google'
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import { Providers } from "@/app/providers";

const mainFont = MainFont({
	subsets: ['latin'],
	variable: '--font-main',
})

export const metadata: Metadata = {
	title: 'One Study Interviews.',
	description: '',
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
				<Providers
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</Providers>
			</body>
		</html>
	)
}
