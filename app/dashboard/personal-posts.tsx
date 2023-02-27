'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthPosts } from '../types/auth-posts';
import EditPost from './edit-post';

const fetchAuthPosts = async () => {
	const response = await axios.get('/api/posts/getAuthPosts');
	return response.data;
};

export default function PersonalPosts(): JSX.Element {
	const { data, isLoading } = useQuery<AuthPosts>({ queryFn: fetchAuthPosts, queryKey: ['auth-posts'] });

	if (isLoading) return <h1>Loading your posts...</h1>;

	return (
		<div>
			{data?.post?.map((post) => (
				<EditPost
					key={post.id}
					id={post.id}
					name={data.name}
					title={post.title}
					avatar={data.image}
					comment={post.comment}
				/>
			))}
		</div>
	);
}
