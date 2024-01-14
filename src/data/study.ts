import { Study } from "@/core/study";

const endpoint = `${process.env.API_ENDPOINT}/study`;

export const getStudyById = async (studyId: string) => {
	const res = await fetch(`${endpoint}/${studyId}`, {
		// cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
			// TODO: Add API key
			// 'API-Key': process.env.DATA_API_KEY!,
		},
	})
	const data = await res.json()

	if (!data.success) {
		throw new Error(`Failed to fetch study with id ${studyId}: ${data.message}`);
	}

	return data.data as Study || {};
}
