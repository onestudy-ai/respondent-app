const endpoint = `${process.env.API_ENDPOINT}/study`;

export async function GET(
	req: Request, 
	{ params }: { params: { id: string } }
) {
	// TODO: Add basic security, CORS, etc.
	const id = params.id;
	const res = await fetch(`${endpoint}/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			// 'API-Key': process.env.DATA_API_KEY!,
		},
	})
	const data = await res.json()

	// TODO: handle failures

	return Response.json({ 
		success: true,
		data: data.data
	});
}
