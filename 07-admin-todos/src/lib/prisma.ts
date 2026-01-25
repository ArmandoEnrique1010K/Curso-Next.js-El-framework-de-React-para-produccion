import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

let prisma: PrismaClient;

/* eslint-disable @typescript-eslint/no-explicit-any */
if (process.env.NODE_ENV === 'production'){
    prisma = new PrismaClient({ adapter });
} else {
    if (!(global as any).prisma){
        (global as any).prisma = new PrismaClient({ adapter });
    }
    prisma = (global as any).prisma;
}

export default prisma;