import { FastifyRequest, FastifyReply } from "fastify";
import {z} from 'zod'
import ShortUniqueId from 'short-unique-id';
import * as poolRepository from './pool.repository'
import { PoolWeb } from "../../Types/types-d";
import { request } from "http";


export async function createPoolService(title:string, verified:boolean){

  const uid = new ShortUniqueId();
  const code = String(uid()).toUpperCase()
  let ownerId = null

  const poolWeb: PoolWeb = {
    title,
    code
  }

  if(verified){

    const response = await poolRepository.createPool(poolWeb)
    return response
  
  } else{
  
    const response = await poolRepository.createPool()
    return response
  
  }


}