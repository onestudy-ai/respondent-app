'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<>
			<div className="relative isolate overflow-hidden bg-white dark:bg-stone-950 min-h-screen flex-col items-center justify-between">
				<div
					className={`w-full h-32 lg:h-64`}
					style={{
						backgroundColor: 'navy'
					}}
				>
					<div className={`w-full h-32 lg:h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-800 to-black opacity-30`} />
				</div>

				<div className="relative w-5/6 lg:w-2/5 mx-auto pb-24 pt-10 lg:flex px-8 -mt-12 lg:-mt-32 bg-white dark:bg-black rounded-2xl shadow-lg z-10">
					<div
						className={'flex w-full flex-1 flex-col items-center space-y-10'}
					>
						There was a problem loading this page.
						<button
							onClick={
								() => reset()
							}
							className="mt-10 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
						>
							Reload and try again
						</button>
					</div>
				</div>

				<div className="mx-auto w-full flex justify-center mt-10 mb-5 text-xs text-gray-400">
					<a href="https://onestudy.ai">Powered by <strong>OneStudy</strong></a>
				</div>
			</div>
		</>
	)
}
