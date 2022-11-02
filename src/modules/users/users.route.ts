import Fastify, { FastifyInstance } from "fastify";
import client from "../../../database/database";

export async function userRoute(server: FastifyInstance){

  server.get('/users/count', async ()=> {
    const count = await client.user.count()

    return {count}
  })

  server.post('/user/create', async () =>{
    return "working users"
  })
}