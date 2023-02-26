import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		/* fetch the posts */
		try {
			const data = await prisma.post.findMany({
				include: { user: true, comment: true },
				orderBy: { createdAt: 'desc' },
			});

			res.status(200).json(data);
		} catch (error) {
			res.status(403).json({ error: 'An error has occured while retrieving the post(s).' });
		}
	}
}
