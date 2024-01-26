"use client";

import { useChat } from "ai/react"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";

import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Interview, MessageWithID } from "@/core/interview";
import { endInterviewDelimiter } from "@/lib/utils";
import RightArrow from "$/assets/icons/corner-up-right.svg";

const mainColor = "#3752dc";

if (!process.env.NEXT_PUBLIC_API_ENDPOINT) {
	throw new Error('NEXT_PUBLIC_API_ENDPOINT env variable is not set');
}

const ConversationWrapper = (props: {
	interview?: Interview | null;
}) => {
	const firstQuestion = props.interview?.study?.meta?.firstQuestion;
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [questionsLeft, setQuestionsLeft] = useState(props.interview?.study?.meta?.followUpQuestionNumber || 5);
	const { messages, append, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
		api: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/conversation/interview`,
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		id: props.interview?.id,
		initialMessages: [
			...(props.interview?.rawMessages as MessageWithID[] || []),
			{ role: 'assistant', content: firstQuestion || '', id: '1' }
		],
		body: {
			interview: props.interview,
			questionsLeft
		},
		onFinish: (message) => {
			const endInterview = message.content.includes(endInterviewDelimiter);
			if (endInterview) {
				setQuestionsLeft(-2);
			} else {
				setQuestionsLeft(questionsLeft - 1);
			}
		},
		onError: (error) => {
			if (error.message.includes('Invalid or expired token')) {
				window.history.back();
			}
		}
	});

	const handleInARush = () => {
		setQuestionsLeft(questionsLeft - 1);
		append({
			role: 'user',
			content: 'I am in a rush, can we wrap this up with the last question?',
			id: 'in-a-rush'
		});
	};

	return (
		<>
			<div className="w-full h-1 bg-gray-200 fixed top-0 left-0">
				<div
					className="h-1 transition-all duration-500 ease-in-out"
					style={{
						width: `${((5 - questionsLeft) / 5) * 100}%`,
						backgroundColor: props.interview?.study?.meta?.primaryColor || mainColor
					}}
				/>
			</div>
			<div className="w-full lg:w-1/3">
				{questionsLeft > -1 ? (
					<>
						<div className="mb-10">
							{messages
								.slice()
								.reverse()
								.filter((m, i) => m.role !== 'user')
								.slice(0, 1)
								.map(m => (
									<p key={m.id} className="px-5 text-lg lg:text-2xl lg:font-bold dark:text-gray-200 text-black">
										{m?.content?.replace(endInterviewDelimiter, '')}
									</p>
								))
							}
						</div>

						<div className="grid w-full gap-2">
							<form onSubmit={handleSubmit} className="w-full flex-col justify-center items-center">
								<Textarea
									id="prompt"
									name="prompt"
									value={input}
									placeholder="Type your response..."
									onChange={handleInputChange}
									className="mb-5 w-full bg-gray-100 dark:bg-stone-900 dark:text-white"
								/>
								<div className="flex justify-center w-full">
									<Button type="submit" size="lg" disabled={isLoading}>
										Submit response
									</Button>
								</div>
							</form>
						</div>

						<div className="absolute bottom-0 right-0 mr-3 mb-3 z-10">
							<RightArrowButton
								message="in a rush?"
								onClick={handleInARush}
							/>
						</div>
					</>
				) : (
					<TheEnd
						interview={props.interview}
					/>
				)}
			</div>
		</>
	);
};
export default ConversationWrapper;

const TheEnd = (props: {
	interview?: Interview | null;
}) => {
		return (
		<div className="flex w-full flex-1 flex-col items-center space-y-10">
			<div
				className={
					'mb-5 flex flex-col space-y-1 md:w-full text-center text-black text-2xl lg:text-4xl font-semibold dark:text-gray-200'
				}
			>
				<Markdown className="prose dark:prose-invert">
						{props.interview?.study?.meta?.farewellMessage || 'You have completed the interview.  Thank you for your time!'}
				</Markdown>
			</div>
		</div>
	);
};


const RightArrowButton = (props: {
	message: string;
	onClick?: () => void;
}) => {
	return (
		<div
			className="text-black dark:text-white font-bold group cursor-pointer border dark:border-zinc-600 rounded-full p-2 flex items-center group-hover:border-black dark:group-hover:border-zinc-400 transition-all duration-300"
			onClick={props.onClick}
		>
			<div
				className="mx-2 hidden group-hover:block"
			>
				{props.message}
			</div>

			<Image
				priority
				src={RightArrow}
				alt="in a rush?"
				className=""
			/>
		</div>
	);
}

