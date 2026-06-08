import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // No modificar esta línea, toma la variable de entorno desde el archivo .env
    url: env("DATABASE_URL"),
  },
});
