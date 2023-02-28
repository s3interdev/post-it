'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import Toggle from './toggle';

type EditProps = {
	id: string;
	name: string;
	title: string;
	avatar: string;
	comment?: {
		id: string;
		userId: string;
		postId: string;
	}[];
};

export default function EditPost({ avatar, name, title, comment, id }: EditProps) {
	/* toggle */
	const [toggle, setToggle] = useState(false);

	const queryClient = useQueryClient();

	let deleteToastId: string;

	/* delete post */
	const { mutate } = useMutation(async (id: string) => await axios.delete('/api/posts/deletePost', { data: id }), {
		onError: (error) => {
			toast.error('There was an error deleting the post.', { id: deleteToastId });
		},
		onSuccess: (data) => {
			toast.success('The post has been deleted.', { id: deleteToastId });
			queryClient.invalidateQueries(['auth-posts']);
		},
	});

	const deletePost = () => {
		deleteToastId = toast.loading('Deleting your post...', { id: deleteToastId });
		mutate(id);
	};

	return (
		<>
			<div className="my-8 rounded bg-white p-8">
				<div className="flex items-center gap-2">
					<Image src={avatar} alt="Avatar" width={32} height={32} className="rounded-full" />
					<h3 className="font-bold text-gray-800">{name}</h3>
				</div>
				<div className="my-8">
					<p className="break-all">{title}</p>
				</div>
				<div className="flex items-center gap-4">
					<p className="text-sm font-bold text-gray-800">{comment?.length} Comments</p>
					<button
						onClick={(e) => {
							setToggle(true);
						}}
						className="rounded bg-red-500 py-2 px-3 text-sm font-bold text-white"
					>
						Delete
					</button>
				</div>
			</div>
			{toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
		</>
	);
}
