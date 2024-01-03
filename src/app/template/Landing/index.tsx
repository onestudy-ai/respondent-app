import Markdown from 'react-markdown';

import { StudyUserMetaData } from "@/core/study";
import { RespondentForm } from './components/RespondentForm';

const mainColor = "#3752dc";

export type LandingPageProps = {
	title?: string;
	description?: string;
	headerBgColor?: string;
	logoUrl?: string;
	isActive?: boolean;
	userMetaData?: StudyUserMetaData[];
}

export default function LandingPage(props: LandingPageProps) {
		return (
		<>
			<div className="relative isolate overflow-hidden bg-white dark:bg-stone-950 min-h-screen flex-col items-center justify-between">
				<div
					className={`w-full h-32 lg:h-64`}
					style={{
						backgroundColor: props.headerBgColor || mainColor
					}}
				>
					<div className={`w-full h-32 lg:h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-800 to-black opacity-30`} />
				</div>

				<div className="absolute top-2 right-2">
					{/* <ModeToggle /> */}
				</div>

				<div className="relative w-5/6 lg:w-2/5 mx-auto pb-24 pt-10 lg:flex px-8 -mt-12 lg:-mt-32 bg-white dark:bg-black rounded-2xl shadow-lg z-10">
					<div
						className={'flex w-full flex-1 flex-col items-center space-y-10'}
					>
						{props.logoUrl ? (
							<img
								src={props.logoUrl}
								className={'w-32 h-32 object-contain rounded-lg dark:bg-white p-3'}
								alt=""
							/>
						) : null}

						{!props.isActive ? (
							<div>
								This link is no longer active.
							</div>
						) : (
							<>
								<h1
									className={
										'text-center text-4xl text-black dark:text-white' +
										' flex flex-col space-y-1 font-heading font-medium'
									}
								>
									<span>{props.title || "We need your feedback!"}</span>
								</h1>

								<div
									className={
										'text-center text-gray-700 dark:text-gray-300' +
										' flex max-w-lg flex-col space-y-1 font-heading md:w-full'
									}
								>
									<Markdown className="prose dark:prose-invert">
                    {props.description || "Thank you for taking the time and talking with us.  We have just a few things to ask you..."}
                  </Markdown>
								</div>

								{props.userMetaData?.length ? (
									<div
										className={
											'text-center text-gray-900 dark:text-white' +
											' flex flex-col space-y-1 font-heading w-full lg:w-2/3'
										}
									>
										<RespondentForm 
											userMetaData={props.userMetaData}
										/>
									</div>
								) : (
									<>Button goes here</>
								)}
							</>
						)}
					</div>
				</div>

				<div className="mx-auto w-full flex justify-center mt-10 mb-5 text-xs text-gray-400">
					<a href="https://onestudy.ai">Powered by <strong>OneStudy</strong></a>
				</div>
			</div>
		</>
	)
}
