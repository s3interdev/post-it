'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AddComment from '../../components/add-comment';
import DisplayPosts from '../../components/display-posts';
import { PostType } from '../../types/posts';

type URL = {
	params: {
		slug: string;
	};
};

/* fetch all posts */
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`);
	return response.data;
};

export default function PostDetail(url: URL) {
	const { data, isLoading, error } = useQuery<PostType>({
		queryFn: () => fetchDetails(url.params.slug),
		queryKey: ['detail-post'],
	});

	if (error) return error;

	if (isLoading) return 'Loading...';

	return (
		<div>
			<DisplayPosts
				avatar={data?.user.image!}
				name={data?.user.name!}
				postTitle={data?.title!}
				id={data?.id!}
				comment={data?.comment}
			/>

			<AddComment id={data?.id!} />

			{data?.comment?.map((c) => (
				<div key={c.id} className="my-6 rounded bg-white p-8">
					<div className="flex items-center gap-2">
						{/* @ts-expect-error Server Component */}
						<Image src={c.user.image} alt="Avatar" width={24} height={24} className="rounded-full" />
						{/* @ts-expect-error Server Component */}
						<h3 className="font-bold">{c.user?.name}</h3>
					</div>
					{/* @ts-expect-error Server Component */}
					<div className="py-4">{c.message}</div>
				</div>
			))}
		</div>
	);
}
