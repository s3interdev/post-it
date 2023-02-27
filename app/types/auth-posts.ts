export type AuthPosts = {
	id: string;
	email: string;
	image: string;
	name: string;
	post: {
		id: string;
		title: string;
		createdAt: string;
		comment?: {
			id: string;
			title: string;
			userId: string;
			postId: string;
			createdAt: string;
		}[];
	}[];
};
