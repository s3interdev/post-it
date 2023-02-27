import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) return res.status(401).json({ message: 'Please sign in to create a post.' });

		const title: string = req.body.title;

		/* get signed in user */
		const signedInUser = await prisma.user.findUnique({
			where: { email: session?.user?.email },
		});

		/* misformatted data */
		if (title.length > 300) return res.status(403).json({ message: 'Please write a shorter post.' });

		if (title.length === 0) return res.status(403).json({ message: 'The post should not be blank.' });

		/* create the post */
		try {
			const result = await prisma.post.create({
				data: { title, userId: signedInUser.id },
			});

			res.status(200).json(result);
		} catch (error) {
			res.status(403).json({ error: 'An error has occured while saving the post.' });
		}
	}
}
