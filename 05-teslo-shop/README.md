# Descripción

Proyecto E-Commerce construido con Next.js, Tailwind CSS y TypeScript.

## Correr en modo de desarrollo

1. Clonar el repositorio.
2. Crear una copia del `.env.template`, renombrarlo a `.env` y cambiar las variables de entorno.
3. Instalar las dependencias `npm install`.
4. Levantar la base de datos con Docker `docker-compose up -d`.
5. Correr las migraciones de Prisma `npx prisma migrate dev`.
6. Generar el cliente de Prisma `npx prisma generate`.
7. Ejecutar el seed `npm run seed`.
8. Correr el proyecto `npm run dev`.
9. Limpiar el localStorage del navegador

## Correr en producción
