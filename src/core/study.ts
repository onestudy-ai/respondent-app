
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
	summary?: string;
	interviewerStyle?: string;
	interviewerStyleCustomMessage?: string;
	organizationId: string;
	userId: string;
	orgGroup?: string;
	meta?: {
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
	userMetaData?: StudyUserMetaData[];
	createdAt: Date | undefined;
}

export interface StudyEmails {
	id: string;
	organizationId: string;
	studyId: string;
	meta?: {
		emails?: string[];
	};
}
