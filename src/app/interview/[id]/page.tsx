import { Suspense } from "react";

import { InterviewWrapper } from "@/app/template/Interview";
import { getInterviewById } from "@/data/interview";

type PageProps = {
	params: { id: string }
}

export default async function InterviewPage(props: PageProps) {
	let data;
	try {
		data = await getInterviewById(props.params.id);
	} catch (error) {
		data = null;
	}

	return (
		<Suspense fallback={null}>
			<InterviewWrapper interview={data} />
		</Suspense>
	)
}
