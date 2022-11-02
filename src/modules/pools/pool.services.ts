import { FastifyRequest, FastifyReply } from "fastify";
import {z} from 'zod'
import ShortUniqueId from 'short-unique-id';
import * as poolRepository from './pool.repository'
import { Pools, reqPools } from "../../Types/types";


export async function createPoolService(data:reqPools){

  const uid = new ShortUniqueId();
  const code = String(uid()).toUpperCase()

  const createPoolBody = z.object({
    title: z.string(),
    ownerId: z.string().nullable()
  })

  const {title, ownerId} = createPoolBody.parse(data)

  const pool: Pools = {
    title,
    code,
    ownerId
  }

  const response = await poolRepository.createPool(pool)

  return response
}