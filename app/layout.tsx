import NavigationHeader from './navigation-header/page';
import './globals.css';

export const metadata = {
	viewport: {
		width: 'device-width',
		initialScale: 1,
	},
	icons: {
		icon: './favicon.png',
		shortcut: './favicon.png',
	},
	title: 'Post IT',
	description: 'CRUD application that allows sharing of posts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="mx-4 bg-gray-200 font-ubuntu text-neutral-800 antialiased laptop:mx-48 desktop:mx-96">
				{/* @ts-expect-error Server Component */}
				<NavigationHeader />
				{children}
			</body>
		</html>
	);
}
