'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

type User = {
	image: string;
};

export default function SignedIn({ image }: User) {
	return (
		<div className="flex items-center gap-6">
			<Link href={'/dashboard'}>
				<Image src={image} width={64} height={64} alt="User Image" priority className="w-14 rounded-full" />
			</Link>

			<button onClick={() => signOut()} className="rounded bg-gray-700 px-5 py-2 uppercase text-white">
				Sign Out
			</button>
		</div>
	);
}
