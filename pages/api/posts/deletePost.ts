import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'DELETE') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) return res.status(401).json({ message: 'Please sign in to delete the post.' });

		const postId: string = req.body;

		try {
			const result = await prisma.post.delete({
				where: { id: postId },
			});

			res.status(200).json(result);
		} catch (error) {
			res.status(403).json({ error: 'An error has occured while deleting the post.' });
		}
	}
}
