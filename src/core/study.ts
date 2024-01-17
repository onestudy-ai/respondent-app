
export enum StudyStatus {
	ACTIVE = 'Active',
	INACTIVE = 'Inactive',
	COMPLETED = 'Completed',
	CANCELLED = 'Cancelled'
}

export type StudyUserMetaData = {
	key: string;
	type: string;
	label: string;
	required?: boolean;
};

export interface Study {
	id: string;
	name: string;
	status?: StudyStatus;
	meta?: MetaData;
	metaData?: MetaData;
	userMetaData?: StudyUserMetaData[];
}

type MetaData = {
	numberCompleted?: number;
	generalInformation?: string;
	firstQuestion?: string;
	farewellMessage?: string;
	followUpQuestionNumber?: number;
	shareTitle?: string;
	shareDescription?: string;
	primaryColor?: string;
	imageUrl?: string;
	[key: string]: any;
};

