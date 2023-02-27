'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

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
	return (
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
				<button className="rounded bg-red-500 py-2 px-3 text-sm font-bold text-white">Delete</button>
			</div>
		</div>
	);
}
