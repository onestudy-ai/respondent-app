"use client"

// from https://medium.com/@nazardubovyk/creating-voice-input-with-openai-api-and-next-js-14-ff398c60e5b4

import { useEffect, useRef,useState } from "react";

export const useRecordVoice = () => {
	const [text, setText] = useState("");
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const [recording, setRecording] = useState(false);
	const isRecording = useRef(false);
	const chunks = useRef([]);

	const startRecording = () => {
		if (mediaRecorder) {
			isRecording.current = true;
			mediaRecorder.start();
			setRecording(true);
		}
	};

	const stopRecording = () => {
		if (mediaRecorder) {
			isRecording.current = false;
			mediaRecorder.stop();
			setRecording(false);
		}
	};

	const getText = async (base64data: string | undefined) => {
		try {
			const response = await fetch("/api/speechToText", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					audio: base64data,
				}),
			});
			
			const json = await response.json();
			const { text } = json;
			setText(text);
		} catch (error) {
			stopRecording();
			console.log(error);
		}
	};

	const initialMediaRecorder = (stream: MediaStream) => {
		const mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.onstart = () => {
			createMediaStream(stream, isRecording.current, (peak) => {
				console.log(peak);
			});
			chunks.current = [];
		};

		mediaRecorder.ondataavailable = (ev: BlobEvent) => {
			chunks.current.push(ev.data as never);
		};

		mediaRecorder.onstop = () => {
			const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
			blobToBase64(audioBlob, getText);
		};

		setMediaRecorder(mediaRecorder);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then(initialMediaRecorder);
		}
	}, []);

	return { recording, startRecording, stopRecording, text, isRecording, setText };
};

const Microphone = () => {
	const { startRecording, stopRecording, text, isRecording } = useRecordVoice();

	return (
		// Button for starting and stopping voice recording
		<button
			onMouseDown={startRecording}    // Start recording when mouse is pressed
			onMouseUp={stopRecording}        // Stop recording when mouse is released
			onTouchStart={startRecording}    // Start recording when touch begins on a touch device
			onTouchEnd={stopRecording}        // Stop recording when touch ends on a touch device
			className={`${isRecording.current ? 'text-red-500' : 'text-gray-900'}`}
		>
			<div className="flex items-center">
				<IconMicrophone />
				Press and hold to record
			</div>
		</button>
	);
};

export { Microphone };

export const IconMicrophone = () => {
	return (
		<svg
			className="w-5 h-5 dark:bg-white dark:p-1 dark:rounded-xl"
			xmlns="http://www.w3.org/2000/svg"
			data-name="Layer 1"
			viewBox="0 0 48 48"
		>
			<path d="M24 33a8 8 0 008-8V9a8 8 0 00-16 0v16a8 8 0 008 8zM20 9a4 4 0 018 0v16a4 4 0 01-8 0z"></path>
			<path d="M38 25a2 2 0 00-4 0 10 10 0 01-20 0 2 2 0 00-4 0 14 14 0 0012 13.84V43h-1a2 2 0 000 4h6a2 2 0 000-4h-1v-4.16A14 14 0 0038 25z"></path>
		</svg>
	);
};

//callback - where we want to get result
const blobToBase64 = (blob: Blob, callback: (result: string) => void) => {
	const reader = new FileReader();
	reader.onload = function () {
		const base64data = reader?.result?.toString().split(",")[1];
		callback(base64data || '');
	};
	reader.readAsDataURL(blob);
};

const getPeakLevel = (analyzer: AnalyserNode) => {
	const array = new Uint8Array(analyzer.fftSize);
	analyzer.getByteTimeDomainData(array);
	return (
		array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
		128
	);
};

const createMediaStream = (stream: MediaStream, isRecording: boolean, callback: (peak: number) => void) => {
	const context = new AudioContext();
	const source = context.createMediaStreamSource(stream);
	const analyzer = context.createAnalyser();
	source.connect(analyzer);
	const tick = () => {
		const peak = getPeakLevel(analyzer);
		if (isRecording) {
			callback(peak);
			requestAnimationFrame(tick);
		}
	};
	tick();
};
