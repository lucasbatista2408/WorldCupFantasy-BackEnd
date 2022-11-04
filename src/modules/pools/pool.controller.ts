import { FastifyRequest, FastifyReply } from "fastify";
import * as poolService from './pool.services'
import client from "../../../database/database";
import ShortUniqueId from "short-unique-id"
import * as poolRepository from './pool.repository'
import { z } from "zod"
import { userAuth } from "../users/userController";

export async function CreatePool(req: FastifyRequest, res: FastifyReply){ 
  const createPoolBody = z.object({
  title: z.string(),
  })

const { title } = createPoolBody.parse(req.body);

const generate = new ShortUniqueId({ length: 6 })
const code = String(generate()).toUpperCase()

try {
  await req.jwtVerify()

  await client.pool.create({
    data: {
      title,
      code,
      ownerId: req.user.sub,

      participants: {
        create: {
          userId: req.user.sub,
        }
      }
    }
  })
} catch {
  await client.pool.create({
    data: {
      title,
      code,
    }
  })
}



return res.status(201).send({ code })
}

export async function JoinPool(req: FastifyRequest, res: FastifyReply){

  const JoinSchema = z.object({
    code: z.string()
  })

  const {code} = JoinSchema.parse(req.body)

  const pool = await client.pool.findUnique({
    where:{
      code
    },
    include:{
      participants:{
        where:{
          userId: req.user.sub
        }
      }
    }
    
  })

  if(!pool){
    res.status(400).send({message: "POOL_NOT_FOUND"})
  }

  if(pool){

    if(pool.participants.length > 0){
      res.status(400).send({message: "user already in poll"})
    }
  
    if(!pool.ownerId){
      const update = await client.pool.update({
        where:{
          id: pool.id
        },
        data:{
          ownerId: req.user.sub
        }
      })
    }

    const response = await client.participants.create({
      data:{
        poolId: pool.id,
        userId: req.user.sub
      }
    })

    res.send ({response})
  }

}

export async function JoinedPools(req: FastifyRequest, res: FastifyReply){
  
  const response = await client.pool.findMany({
    where:{
      participants:{
        some: {
          userId: req.user.sub
        }
      }
    },
    include:{
      _count:{
        select:{
          participants: true
        }
      },
      participants:{
        select:{
          id: true,
          users:{
            select:{
              avatarUrl: true
            }
          }
        },
        take: 4
      },
      ownner: {
        select:{
          id: true,
          name: true,
        }
      }
    }
  })

  res.send({response})
}

export async function PoolInfo(req: FastifyRequest, res: FastifyReply){
  const paramsSchema = z.object({
    id: z.string()
  })

  const {id} = paramsSchema.parse(req.params)

  const response = await client.pool.findUnique({
    where:{
      id
    },
    include:{
      _count:{
        select:{
          participants: true
        }
      },
      participants:{
        select:{
          id: true,
          users:{
            select:{
              avatarUrl: true
            }
          }
        },
        take: 4
      },
      ownner: {
        select:{
          id: true,
          name: true
        }
      }
    }
  })

  res.status(200).send(response)
}