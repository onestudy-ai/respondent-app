'use client'

import { FieldValues, useForm } from 'react-hook-form';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { StudyUserMetaData } from "@/core/study";

export const RespondentForm = (props: {
	userMetaData: StudyUserMetaData[];
	isStarting: boolean;
	handleSubmit: (data: FieldValues) => void;
}) => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const handleUserFields = async (data: FieldValues) => {
		props.handleSubmit(data);
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
					disabled={props.isStarting}
					className={'flex justify-center mx-auto'}
					type="submit"
				>
					<span className="flex items-center space-x-2 font-bold">
						<span>
							{props.isStarting ? 'Starting interview...' : 'Get started'}
						</span>
					</span>
				</Button>
			</div>
		</form>
	);
};