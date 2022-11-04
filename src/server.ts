import Fastify, { fastify, FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import client from "../database/database";
import cors from "@fastify/cors";
import jwt, { Secret } from "@fastify/jwt";
import {CreatePool} from "./modules/pools/pool.controller";
import { poolRoute } from "./modules/pools/pool.route";
import { userRoute } from "./modules/users/users.route";
import { guessRoute } from "./modules/guesses/guesses.route";
import { GameRoute } from "./modules/games/gameRoutes";

dotenv.config();

const PORT:number = Number(process.env.PORT) || 5000;


const server = Fastify({
  logger: true,
})

server.get('/healthcheck', async () =>{
  return {status: "OK"}
})

async function bootstrap(){

  await server.register(cors, {
    origin: true
  })


  await server.register(jwt, {
    secret: 'secret_jwt'
  })
  
  // ROUTES
  server.register(poolRoute)
  server.register(userRoute)
  server.register(guessRoute)
  server.register(GameRoute)
  //

  try {
    await server.listen({port: PORT})
    console.log(`Server up at http://localhost:${PORT}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

}

bootstrap()