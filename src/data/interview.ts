/**
 * This is a server-side file that talks to the OneStudy.ai API.
 * It is not meant to be used on the client-side.
 */

import 'server-only';

import { Interview } from "@/core/interview";

const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

export const getInterviewById = async (interviewId: string, token: string) => {
	const res = await fetch(`${endpoint}/conversation/${interviewId}`, {
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.API_KEY as string,
			'Authorization': `Bearer ${token}`,
		},
	})
	const data = await res.json();
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
		token: data.token,
		id: data.id,
	};
}
