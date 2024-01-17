import type { Metadata } from "next"
import { Suspense } from "react";

import { ModeToggle } from "./components/ModeToggle";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "OneStudy.ai Research and Interviews",
		description: "OneStudy is a platform for researchers to conduct interviews.",
	}
}

export default async function Main() {
	return (
		<Suspense fallback={null}>
			<div className="relative isolate overflow-hidden bg-white dark:bg-stone-950 min-h-screen flex-col items-center justify-between">
				<div className="absolute top-2 right-2">
					<ModeToggle />
				</div>

				<div className="mx-auto w-full flex justify-center items-center h-screen text-xs text-gray-400">
					<a href="https://onestudy.ai">Powered by <strong>OneStudy</strong></a>
				</div>
			</div>
		</Suspense>
	)
}
