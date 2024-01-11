import { getStudyById } from '@/data/study';
import { ImageResponse } from 'next/og';

export const size = {
	width: 1200,
	height: 630,
};

export default async function Image({ params }: { params: { id: string } }) {
	const data = await getStudyById(params.id);

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					letterSpacing: '-.02em',
					fontWeight: 700,
					background: data.metaData?.primaryColor || 'white',
				}}
			>
				<div
					style={{
						left: 42,
						top: 42,
						position: 'absolute',
						display: 'flex',
						alignItems: 'center',
						backgroundColor: 'white',
						padding: 20,
						borderRadius: 10,
					}}
				>
					<span
						style={{
							marginRight: 8,
							fontSize: 20,
						}}
					>
						powered by
					</span>
					<img
						src="https://onestudy.ai/_next/static/media/logo_dark.bc71a1c1.svg"
						style={{
							height: 40,
						}}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						padding: '20px 20px',
						margin: '0 20px',
						fontSize: 40,
						width: 'auto',
						textAlign: 'center',
						backgroundColor: 'black',
						color: 'white',
						lineHeight: 1.4,
					}}
				>
					{data?.metaData?.shareTitle || "We need your feedback!"}
				</div>
			</div>
		),
		{ ...size }
	);
}