"use client"

import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState } from "react";

export const EmbedWrapper = (props: {
	url?: string;
}) => {
	const [embedHtml, setEmbedHtml] = useState<string>();
	const [dimensions, setDimensions] = useState({ 
		width: typeof window !== 'undefined' ? window.innerWidth : 0, 
		height: typeof window !== 'undefined' ? window.innerHeight : 0 
	});

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== 'undefined') {
				setDimensions({
					width: window.innerWidth,
					height: window.innerHeight
				});
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize);
			}
		};
	}, []);

	useEffect(() => {
		const embedLoomVideo = async () => {
			const videoUrl = props.url;
			if (videoUrl) {
				const { html } = await oembed(videoUrl, {
					width: dimensions.width,
					height: dimensions.height
				});
				setEmbedHtml(html);
			} else {
				setEmbedHtml(undefined);
			}
		}

		embedLoomVideo();
	}, [props.url, dimensions]);

	return (
		<>
			{embedHtml ? (
				<div 
					dangerouslySetInnerHTML={{ __html: embedHtml }} 
				/>
			) : null}
		</>
	);
};
