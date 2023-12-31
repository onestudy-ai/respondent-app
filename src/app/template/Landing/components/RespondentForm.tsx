'use client'

import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';

import { StudyUserMetaData } from "@/core/study";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const RespondentForm = (props: {
	userMetaData: StudyUserMetaData[];
}) => {
	const { register, handleSubmit, setValue, formState: { errors } } = useForm();
	const [isStarting, setIsStarting] = useState(false);

	const handleUserFields = async (data: FieldValues) => {
		setIsStarting(true);
		console.log('TODO: Start interview callback');
	};

	return (
		<form className={''} onSubmit={handleSubmit(handleUserFields)}>
			<div className="flex flex-col space-y-4 mb-10 text-left">
				{props.userMetaData.map((metaData) => (
					<Label key={metaData.key}>
						{metaData.label}
						{errors[metaData.label] && <div className="text-xs text-red-500">{errors[metaData.label]?.message?.toString()}</div>}
						<Input
							className={'w-full mt-2'}
							type={metaData.type}
							{...register(metaData.label, { required: metaData.required && 'This must be provided to continue.' })}
						/>
					</Label>
				))}

				{props.userMetaData?.find(metaData => metaData.type === 'email') ? (
					<div>
						<Label>
							Would you like a transcript of this conversation emailed to you?
							<input
								type="checkbox"
								className={'ml-2'}
								{...register('transcriptOptIn')}
							/>
						</Label>
					</div>
				) : null}
			</div>

			<div className={'flex justify-center space-x-2 w-full'}>
				<Button
					size="lg"
					disabled={isStarting}
					className={'flex justify-center mx-auto'}
					type="submit"
				>
					<span className="flex items-center space-x-2 font-bold">
						<span>
							{isStarting ? 'Starting interview...' : 'Get started'}
						</span>
					</span>
				</Button>
			</div>
		</form>
	);
};