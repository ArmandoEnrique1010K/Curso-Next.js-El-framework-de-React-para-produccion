# ¿Para que sirve el archivo README.md?

El archivo README.md sirve para documentar los pasos necesarios para levantar la aplicación en desarrollo o en producción

**Ejemplo:**

# Development

Pasos para levantar la app en desarrollo

1. levantar la base de datos

```bash
docker-compose up -d
```

2. Renombrar el `.env.template` a `.env`
3. Reemplazar las variables de entorno
4. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Prisma commands

```bash
npx prisma init
npx prisma migrate dev

```
