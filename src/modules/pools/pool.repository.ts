import client from "../../../database/database";
import { Pools } from "../../Types/types-d";

export async function createPool(pool:Pools) {

  const response = await client.pool.create({data:pool})
  
  return response
}