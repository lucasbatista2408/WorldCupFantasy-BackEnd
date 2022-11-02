import Fastify, { FastifyInstance } from "fastify";
import { CreatePool } from "./pool.controller";
import client from "../../../database/database";

export async function poolRoute(server: FastifyInstance){

  server.get('/pools/count', async ()=> {
    const count = await client.pool.count()

    return {count}
  })

  server.post('/pools/create', CreatePool)
}