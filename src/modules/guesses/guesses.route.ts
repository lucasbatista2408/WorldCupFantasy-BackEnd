import Fastify, { FastifyInstance } from "fastify";
import client from "../../../database/database";

export async function guessRoute(server: FastifyInstance){

  server.get('/guesses/count', async ()=> {
    const count = await client.guess.count()
    
    return {count}
  })

  server.post('/guesses/create', async () =>{
    return "working guesses"
  })
}