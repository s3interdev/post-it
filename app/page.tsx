'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CreatePost from './components/create-post';
import DisplayPosts from './components/display-posts';
import { PostType } from './types/posts';

/* fetch all posts */
const getAllPosts = async () => {
	const response = await axios.get('/api/posts/getPosts');
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: getAllPosts, queryKey: ['posts'] });

	if (error) return error;

	if (isLoading) return 'Loading...';

	return (
		<main>
			<CreatePost />

			{data?.map((post) => (
				<DisplayPosts
					key={post.id}
					id={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
					comment={post.comment}
				/>
			))}
		</main>
	);
}
