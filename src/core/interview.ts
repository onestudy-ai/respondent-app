import { Study } from "./study";

export type Interview = {
	studyId: string;
	study: Study;
	userMetaData: { [key: string]: any; };
	rawMessages: Message[];
	id: string;
}

export enum RoleEnum {
	system = 'system',
	user = 'user',
	assistant = 'assistant',
};

export interface Message {
	id?: string;
	name?: string;
	role: RoleEnum;
	content: string;
}

export type MessageWithID = Required<Pick<Message, 'id'>> & Omit<Message, 'id'>;
