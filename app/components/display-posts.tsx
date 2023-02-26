'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DisplayPosts({ avatar, name, postTitle, id }) {
	return (
		<div className="my-8 rounded bg-white p-8">
			<div className="flex items-center gap-2">
				<Image src={avatar} alt="Avatar" height={32} width={32} className="rounded-full" />
				<h3 className="font-bold text-gray-800">{name}</h3>
			</div>
			<div className="my-8">
				<p className="break-all">{postTitle}</p>
			</div>
			<div className="flex cursor-pointer items-center gap-4">
				<Link href={`/posts/${id}`}>
					<p className="text-sm font-bold text-gray-800">Comments</p>
				</Link>
			</div>
		</div>
	);
}
