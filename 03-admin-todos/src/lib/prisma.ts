// Código fuente obtenido de: https://vercel.com/kb/guide/nextjs-prisma-postgres#step-3:-install-prisma-and-configure-prisma-postgres
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// Forma antigua con prisma 6
// import { PrismaClient } from '../generated/prisma/client';
// import { Pool } from 'pg';
// import { PrismaPg } from '@prisma/adapter-pg';

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// const adapter = new PrismaPg(pool);

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production'){
//     prisma = new PrismaClient({ adapter });
// } else {
//     if (!(global as any).prisma){
//         (global as any).prisma = new PrismaClient({ adapter });
//     }
//     prisma = (global as any).prisma;
// }

// export default prisma;
