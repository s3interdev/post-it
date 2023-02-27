export type postType = {
	id: string;
	title: string;
	createAt: string;
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
