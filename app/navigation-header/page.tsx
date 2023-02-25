import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import SignIn from './signin';
import SignedIn from './signedin';

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<nav className="flex items-center justify-between py-5">
			<Link href={'/'}>
				<h1 className="text-2xl font-semibold">Post IT</h1>
			</Link>

			<div className="flex items-center gap-6">
				{!session?.user && <SignIn />}
				{session?.user && <SignedIn image={session.user?.image || ''} />}
			</div>
		</nav>
	);
}
