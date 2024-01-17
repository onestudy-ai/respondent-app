import 'server-only';

import { Study } from "@/core/study";

const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/study`;

export const getStudyById = async (studyId: string) => {
	const res = await fetch(`${endpoint}/${studyId}`, {
		// cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.API_KEY as string,
		},
	})
	const data = await res.json();

	if (!data.success) {
		throw new Error(`Failed to fetch study with id ${studyId}: ${data.message}`);
	}

	return data.data as Study;
}
