import Fastify, { FastifyInstance } from "fastify";
import { CreatePool, JoinPool, JoinedPools, PoolInfo} from "./pool.controller";
import client from "../../../database/database";
import { authenticate } from "../../plugins/authenticate";

export async function poolRoute(server: FastifyInstance){

  server.get('/pools/count', async ()=> {
    const count = await client.pool.count()

    return {count}
  })

  server.post('/pools/create', CreatePool)

  server.post('/pools/join', {onRequest: [authenticate]}, JoinPool)

  server.get('/pools/joined', {onRequest: [authenticate]}, JoinedPools)

  server.get('/pools/:id', {onRequest: [authenticate]}, PoolInfo)
}