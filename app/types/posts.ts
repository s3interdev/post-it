export type PostType = {
	id: string;
	title: string;
	createdAt: string;
	user: {
		name: string;
		image: string;
	};
	comment?: {
		id: string;
		userId: string;
		postId: string;
		createdAt: string;
	}[];
};
