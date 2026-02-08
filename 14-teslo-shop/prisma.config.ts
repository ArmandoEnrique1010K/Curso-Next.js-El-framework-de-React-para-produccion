import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Esta es la forma correcta de configurar prisma en la actualidad
export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    // engine: "classic",

    // Obtiene la URL de la base de datos desde el archivo .env
    datasource: {
        url: env("DATABASE_URL"),
    },
});