import { Pool } from "@prisma/client";


export type Pools = Omit<Pool, "id" | "createAt">
export type reqPools = Omit<Pool, "id" | "createAt" | "code">