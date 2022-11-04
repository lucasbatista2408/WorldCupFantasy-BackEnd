import Fastify, { FastifyInstance } from "fastify";
import client from "../../../database/database";
import { authenticate } from "../../plugins/authenticate";
import { GameList } from "./game.controller";

export async function GameRoute(server: FastifyInstance){

  server.get('/pools/:id/games', {onRequest: [authenticate]}, GameList)
}