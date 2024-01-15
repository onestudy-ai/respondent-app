import { startInterview } from "@/data/interview"

export async function POST(request: Request) {
	const json = await request.json();
	const studyId = json.studyId;
	const userMetaData = json.userMetaData;
	console.log('json', json)

	if (!studyId) {
		return Response.json({
			success: false,
			error: 'No study provided'
		});
	}
	const interviewResponse = await startInterview(studyId, userMetaData);

	return Response.json(interviewResponse)
}
