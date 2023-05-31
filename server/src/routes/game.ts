import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";


export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:id/games', {
    onRequest: [authenticate]
  }, async (request) => {
    const getPoolParams = z.object({
      id: z.string()
    })

    const { id } = getPoolParams.parse(request.params)

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc',
      }
    })

    return { games }
  })
};