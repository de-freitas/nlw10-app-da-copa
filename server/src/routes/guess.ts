import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";


export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count();
		
		return { count };
	})

	fastify.post('/pools/:poolId/games/:gameId/guesses', {
		onRequest: [authenticate]
	}, async (request, reply) => {
		const createGuessParams = z.object({
			poolId: z.string(),
			gameId: z.string(),
		})

		const createGuessBody = z.object({
			firstTeamPoints: z.number(),
			secondTeamPoints: z.number(),
		})

		const { poolId, gameId } = createGuessParams.parse(request.params)
		const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)

		const participant = await prisma.participant.findUnique({
			where: {
				userId_poolId: {
					poolId,
					userId: request.user.sub,
				}
			}
		})

		if (!participant) {
			return reply.status(400).send({
				message: "You are not allowed to create a guess inside this pool!"
			})
		}
		
		return {
			poolId,
			gameId,
			firstTeamPoints,
			secondTeamPoints,
		}

	})
};