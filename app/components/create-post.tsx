'use client';

import { useState } from 'react';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	return (
		<form className="rounded bg-white p-8">
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
					disabled={isDisabled}
					className="rounded bg-gray-700 px-5 py-2 uppercase text-white disabled:opacity-25"
				>
					Create Post
				</button>
			</div>
		</form>
	);
}
