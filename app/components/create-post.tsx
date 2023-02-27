'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();

	let toastPostId: string;

	/* create a post */
	const { mutate } = useMutation(async (title: string) => await axios.post('/api/posts/createPost', { title }), {
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, { id: toastPostId });
			}

			setIsDisabled(false);
		},
		onSuccess: (data) => {
			toast.success('The post was saved successfully.', { id: toastPostId });
			queryClient.invalidateQueries(['posts']);
			setTitle('');
			setIsDisabled(false);
		},
	});

	const submitPost = async (e: React.FormEvent) => {
		e.preventDefault();

		toastPostId = toast.loading('Saving your post...', { id: toastPostId });

		setIsDisabled(true);

		mutate(title);
	};

	return (
		<form onSubmit={submitPost} className="rounded bg-white p-8">
			<div className="my-4 flex flex-col">
				<textarea
					onChange={(e) => setTitle(e.target.value)}
					name="title"
					value={title}
					rows={7}
					placeholder="What do you want to say?"
					className="my-2 rounded bg-gray-200 p-4 text-lg"
				></textarea>
			</div>

			<div className="flex items-center justify-between gap-2">
				<p className={`text-sm font-bold ${title.length > 300 ? 'text-red-500' : 'text-neutral-800'}`}>
					{`${title.length}/300`}
				</p>
				<button
					type="submit"
					disabled={isDisabled}
					className="rounded bg-gray-700 px-5 py-2 uppercase text-white disabled:opacity-25"
				>
					Create Post
				</button>
			</div>
		</form>
	);
}
