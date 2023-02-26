'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CreatePost from './components/create-post';
import DisplayPosts from './components/display-posts';

/* fetch all posts */
const getAllPosts = async () => {
	const response = await axios.get('/api/posts/getPosts');
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery({ queryFn: getAllPosts, queryKey: ['posts'] });

	if (error) return error;

	if (isLoading) return 'Loading...';

	return (
		<main>
			<p className="my-4 text-lg">Welcome to The Home Page</p>

			<CreatePost />

			{data?.map((post) => (
				<DisplayPosts
					key={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
					id={post.id}
				/>
			))}
		</main>
	);
}
