'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
	return (
		<button onClick={() => signIn()} className="rounded bg-gray-700 px-5 py-2 uppercase text-white disabled:opacity-25">
			Sign In
		</button>
	);
}
