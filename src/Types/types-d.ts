import { Secret } from "@fastify/jwt";
import { Pool } from "@prisma/client";
import '@fastify/jwt'

declare module '@fastify/jwt'{
  interface FastifyJWT{
    user: {
      sub:string,
      name: string,
      avatarUrl: string
    }
  }
}

export type PoolWeb = Omit<Pool, "id" | "createAt" | "ownerId">
export type PoolMobile = Omit<Pool, "id" | "createAt" >
export type reqPools = Omit<Pool, "id" | "createAt" | "code">