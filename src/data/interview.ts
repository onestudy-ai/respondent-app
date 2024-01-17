import { Interview } from "@/core/interview";

const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

export const getInterviewById = async (interviewId: string) => {
	const res = await fetch(`${endpoint}/conversation/${interviewId}`, {
		// cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.API_KEY as string,
		},
	})
	const data = await res.json()

	if (!data.success) {
		throw new Error(`Failed to fetch interview with id ${interviewId}: ${data.message}`);
	}

	return data.data as Interview || {};
}

export const startInterview = async (
	studyId: string,
	userMetaData?: Interview['userMetaData']
) => {
	const res = await fetch(`${endpoint}/conversation/start`, {
		method: 'POST',
		body: JSON.stringify({
			studyId,
			userMetaData,
		}),
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.API_KEY as string,
		},
	});
	if (!res.ok) {
		throw new Error(`Failed to create interview for study ${studyId}: ${res.statusText}`);
	}

	const data = await res.json()

	if (!data.success) {
		throw new Error(`Failed to create interview for study ${studyId}: ${data.message}`);
	}

	return {
		success: data.success,
		id: data.id,
	};
}
