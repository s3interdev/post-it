'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type Comment = {
	postId?: string;
	title: string;
};

type PostProps = {
	id?: string;
};

export default function AddComment({ id }: PostProps) {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	let commentToastId: string;

	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		async (data: Comment) => {
			return axios.post('/api/posts/createComment', { data });
		},
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, { id: commentToastId });
				}

				setIsDisabled(false);
			},
			onSuccess: (data) => {
				toast.success('Your comment was added.', { id: commentToastId });
				queryClient.invalidateQueries(['detail-post']);
				setTitle('');
				setIsDisabled(false);
			},
		}
	);

	const submitPost = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsDisabled(true);

		commentToastId = toast.loading('Adding your comment...', { id: commentToastId });

		mutate({ title, postId: id });
	};

	return (
		<form onSubmit={submitPost} className="my-8">
			<h3 className="">Add a comment</h3>
			<div className="my-2 flex flex-col">
				<input
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					type="text"
					name="title"
					className="my-2 rounded p-4 text-lg"
				/>
			</div>
			<div className="flex items-center gap-2">
				<button
					disabled={isDisabled}
					className="rounded bg-gray-700 py-2 px-6 text-sm text-white disabled:opacity-25"
					type="submit"
				>
					Add Comment
				</button>
				<p
					className={`font-bold  ${title.length > 300 ? 'text-red-500' : 'text-neutral-800'} `}
				>{`${title.length}/300`}</p>
			</div>
		</form>
	);
}
