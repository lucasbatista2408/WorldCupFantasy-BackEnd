import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"
import client from "../../../database/database";


export async function GameList(req: FastifyRequest, res: FastifyReply){
  const gameSchema = z.object({
    id: z.string(),
    })

  const {id} = gameSchema.parse(req.params)

  const response = await client.game.findMany({
    // where:{
    //   id
    // },
    orderBy:{
      date: 'desc'
    },
    include:{
      guesses:{
        where:{
          participant:{
            id: req.user.sub,
            poolId: id
          }
        }
      }
    }
  })

  res.send({response: response.map(game => {
    return {
      ...game,
      guess: game.guesses.length > 0 ? game.guesses[0] : null,
      guesses: undefined
    }
  })})
}