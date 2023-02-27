import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	/* get the authenticated users' posts */
	if (req.method === 'GET') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) return res.status(401).json({ message: 'Please sign in to create a post.' });

		try {
			const data = await prisma.user.findUnique({
				where: { email: session?.user?.email },
				include: {
					post: {
						orderBy: { createdAt: 'desc' },
						include: { comment: true },
					},
				},
			});

			return res.status(200).json(data);
		} catch (error) {
			res.status(403).json({ error: 'An error has occured while saving the post.' });
		}
	}
}
