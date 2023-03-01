import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.post.findUnique({
				where: { id: req.query.details?.toString() },
				include: {
					user: true,
					comment: {
						orderBy: { createdAt: 'desc' },
						include: { user: true },
					},
				},
			});

			return res.status(200).json(data);
		} catch (error) {
			res.status(403).json({ error: 'An error has occured while retrieving the post.' });
		}
	}
}
