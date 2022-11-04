import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import client from "../../../database/database";
import {z} from 'zod'


export async function userAuth(req: FastifyRequest, res: FastifyReply){

  const createUserBody = z.object({
    access_token: z.string()
  })

  const {access_token} = createUserBody.parse(req.body)

  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers:{
      Authorization: `Bearer ${access_token}`
    }
  })

  const response = await userResponse.json()

  const responseData = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    picture: z.string().url(),
  })

  const userInfo = responseData.parse(response)

  const findgoogleid = await client.user.findUnique({
    where:{
      googleId: userInfo.id
    }
  })

  if(!findgoogleid){
    const user = await client.user.create({
      data: {
        name: userInfo.name,
        googleId: userInfo.id,
        email: userInfo.email,
        avatarUrl: userInfo.picture
      }
    })
    
    const token = server.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    },{
      sub: user.id
    })
  
    return {user, token}
  }

  if(findgoogleid){

    const token = server.jwt.sign({
      name: findgoogleid.name,
      avatarUrl: findgoogleid.avatarUrl,
    },{
      sub: findgoogleid.id
    })

    return {findgoogleid, token}
  }

}