import { FastifyRequest, FastifyReply } from "fastify";
import * as poolService from './pool.services'

export async function CreatePool(req: FastifyRequest, res: FastifyReply) {

  const data = Object(req.body)

  const response = await poolService.createPoolService(data)

  return res.status(201).send({code: response.code});
}