'use client';

import CreatePost from './components/create-post';

export default function Home() {
	return (
		<main>
			<p className="my-4 text-lg">Welcome to The Home Page</p>
			<CreatePost />
		</main>
	);
}
