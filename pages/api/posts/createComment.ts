import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) return res.status(401).json({ message: 'Please sign in to create a comment.' });

		/* get user */
		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email?.toString() },
		});

		const { title, postId } = req.body.data;

		if (!prismaUser) return res.status(403).json({ message: 'The user does not exist.' });

		if (title.length === 0) return res.status(403).json({ message: 'The comment should not be blank.' });

		try {
			const result = await prisma.comment.create({
				data: { message: title, userId: prismaUser.id, postId },
			});

			res.status(200).json(result);
		} catch (error) {
			res.status(403).json({ error: 'An error has occured while saving the comment.' });
		}
	}
}
