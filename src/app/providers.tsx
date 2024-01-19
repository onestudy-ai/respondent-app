"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import * as React from "react"

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
	})
}

export function Providers({ children, ...props }: ThemeProviderProps) {
	const [queryClient] = React.useState(() => new QueryClient());
	
	return (
		<NextThemesProvider {...props}>
			<PostHogProvider client={posthog}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</PostHogProvider>
		</NextThemesProvider>
	)
}
