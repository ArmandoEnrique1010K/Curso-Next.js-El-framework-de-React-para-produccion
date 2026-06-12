// Inicializar el cliente de prisma
// https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres#7-instantiate-prisma-client
// https://vercel.com/kb/guide/nextjs-prisma-postgres#step-3:-install-prisma-and-configure-prisma-postgres
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

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
