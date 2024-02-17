import { Suspense } from "react";

import { InterviewWrapper } from "@/app/template/Interview";
import { getInterviewById } from "@/data/interview";

type PageProps = {
	params: { id: string },
	searchParams: { [key: string]: string | string[] | undefined }
}

export default async function InterviewPage(props: PageProps) {
	const token = props.searchParams.token || "";
	const data = await getInterviewById(props.params.id, token! as string);

	return (
		<Suspense fallback={null}>
			<InterviewWrapper interview={data} />
		</Suspense>
	)
}
