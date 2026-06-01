## ¿Qué es Next.js?

Next.js es un framework basado en React que amplía las capacidades de una aplicación React tradicional. Permite crear desde sitios web estáticos hasta aplicaciones complejas con renderizado en servidor, optimización automática y herramientas integradas para producción.

Una forma sencilla de verlo es:

> **Next.js te permite hacer todo lo que ya sabes hacer en React, pero agregando mejores opciones de rendimiento, SEO, renderizado, enrutamiento y despliegue.**

## Es un framework poderoso para servir contenido estático y generado desde el lado del servidor

React por sí solo es una librería para construir interfaces de usuario.

Next.js añade funcionalidades adicionales como:

- Renderizado en servidor (SSR)
- Generación estática (SSG)
- Regeneración incremental (ISR)
- Enrutamiento automático
- División automática de código (Code Splitting)
- Optimización de imágenes
- Manejo de metadatos SEO
- API Routes
- Server Components
- Streaming y Suspense

Gracias a esto, puede entregar páginas:

- Ya generadas previamente (estáticas)
- Generadas dinámicamente en el servidor
- Renderizadas completamente en el cliente

según las necesidades de cada página.

## Puedes hacer todo lo que sabes en React, más mejoras importantes

Si ya conoces React:

```jsx
function Home() {
  return <h1>Hola mundo</h1>;
}
```

Ese mismo conocimiento sigue siendo válido en Next.js.

Pero además obtienes:

### Mejor rendimiento

Next divide automáticamente el código.

Ejemplo:

Si tienes:

- Login
- Dashboard
- Configuración

el navegador descarga únicamente el código de la página visitada.

Esto reduce:

- Tiempo de carga
- Consumo de memoria
- Transferencia de datos

### SEO mejorado

Los motores de búsqueda pueden leer el contenido desde el servidor sin depender de JavaScript.

### Router integrado

En React normalmente instalas:

```bash
npm install react-router-dom
```

En Next.js el sistema de rutas viene incorporado.

Por ejemplo:

```plaintext
app/
 ├─ page.tsx
 ├─ about/page.tsx
 └─ contact/page.tsx
```

genera automáticamente:

```plaintext
/
/about
/contact
```

### Separación automática de código

Cada página genera su propio bundle.

No todo el código se envía al navegador desde el inicio.

## ¿Por qué se recomienda usar Next.js?

Porque resuelve muchos problemas comunes de React que normalmente tendrías que configurar manualmente.

Con React puro debes instalar y configurar:

- Router
- SEO
- SSR
- Optimización de imágenes
- Compresión
- Bundling avanzado
- Caché
- Renderizado híbrido

Con Next.js muchas de estas características ya vienen incluidas.

Por eso hoy es considerado el framework React más utilizado para aplicaciones web modernas.

## Next.js cambia el paradigma de las SPA

Durante muchos años la mayoría de aplicaciones React eran SPA.

SPA significa:

> Single Page Application

Toda la aplicación se carga inicialmente y luego JavaScript se encarga de actualizar la interfaz.

Next.js introduce un enfoque híbrido.

No te obliga a elegir un único método de renderizado.

Puedes mezclar:

- SSR
- SSG
- CSR
- ISR

en una misma aplicación.

Por ejemplo:

| Página    | Estrategia |
| --------- | ---------- |
| Inicio    | SSG        |
| Blog      | ISR        |
| Dashboard | CSR        |
| Perfil    | SSR        |

Cada página utiliza la estrategia más adecuada.

## ¿Cómo funciona una SPA?

En React tradicional sucede algo así:

### Paso 1

El navegador solicita:

```plaintext
https://midominio.com
```

### Paso 2

El servidor responde:

```html
<body>
  <div id="root"></div>
</body>
```

Prácticamente vacío.

### Paso 3

Se descarga JavaScript:

```plaintext
main.js
vendors.js
runtime.js
```

### Paso 4

React construye la interfaz en el navegador.

### Resultado

El usuario ve:

```plaintext
Pantalla vacía
↓
Carga JS
↓
Render React
↓
Contenido visible
```

## ¿Por qué una SPA no es SEO Friendly?

Los motores de búsqueda intentan leer el HTML.

En una SPA reciben inicialmente:

```html
<body>
  <div id="root"></div>
</body>
```

No existe contenido visible.

El contenido real aparece después de ejecutar JavaScript.

Aunque motores modernos como Google pueden ejecutar JavaScript, esto:

- Consume más recursos
- Es más lento
- No siempre garantiza una indexación correcta
- Puede afectar el posicionamiento

Por eso las SPA suelen tener peores resultados SEO que aplicaciones renderizadas en servidor.

## ¿Por qué es importante el SEO?

SEO significa:

> Search Engine Optimization

Es el conjunto de técnicas para aparecer mejor posicionado en buscadores.

Por ejemplo:

Si tienes una tienda online de guitarras.

Sin SEO:

```plaintext
Página 20 de Google
```

Con SEO:

```plaintext
Página 1 de Google
```

La diferencia puede significar:

- Más visitas
- Más clientes
- Más ventas
- Más ingresos

## Estrategias de renderizado de Next.js

### CSR (Client Side Rendering)

Todo ocurre en el navegador.

Similar a React tradicional.

```plaintext
Servidor
    ↓
HTML vacío
    ↓
JS
    ↓
Render React
```

Ideal para:

- Dashboards
- Aplicaciones internas
- Paneles administrativos

### SSR (Server Side Rendering)

El servidor genera HTML en cada petición.

```plaintext
Usuario
    ↓
Servidor
    ↓
HTML completo
    ↓
Navegador
```

Ventajas:

- SEO excelente
- Datos siempre actualizados

Desventajas:

- Mayor carga del servidor

Ideal para:

- Ecommerce
- Noticias
- Contenido dinámico

### SSG (Static Site Generation)

Las páginas se generan durante el proceso de build.

```plaintext
npm run build
```

Se crean archivos HTML estáticos.

```plaintext
index.html
about.html
blog.html
```

Ventajas:

- Máxima velocidad
- Excelente SEO
- Menor costo de infraestructura

Ideal para:

- Landing pages
- Portafolios
- Documentación

### ISR (Incremental Static Regeneration)

Combina SSG y SSR.

Las páginas son estáticas, pero pueden regenerarse automáticamente.

Ejemplo:

```typescript
revalidate: 60;
```

Cada 60 segundos Next puede actualizar la página.

Ventajas:

- Velocidad de SSG
- Datos relativamente frescos

Ideal para:

- Blogs
- Catálogos
- Ecommerce

### DR (Dynamic Routing)

Permite crear rutas dinámicas.

Ejemplo:

```plaintext
/products/[id]
```

URLs generadas:

```plaintext
/products/1
/products/2
/products/3
```

Código:

```tsx
app / products / [id] / page.tsx;
```

Muy útil para:

- Productos
- Usuarios
- Posts de blog
- Categorías

## Crear un proyecto de Next.js

La forma recomendada actualmente es ejecutar el siguiente comando en una terminal:

```bash
npx create-next-app@latest
```

La herramienta `create-next-app` genera toda la estructura inicial del proyecto y configura automáticamente las dependencias necesarias.

### Requisitos previos

Next.js requiere Node.js 20.9 o superior y TypeScript 5.1 o superior.

Verifica que tengas instalado Node.js ejecutando el siguiente comando:

```bash
node -v
npm -v
```

Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/).

### Nuevo flujo en Next.js 16

Una diferencia importante respecto a Next.js 14 es que ahora aparece una pregunta inicial luego de definir el nombre del proyecto:

```
Would you like to use the recommended Next.js defaults?
```

Opciones:

```
Yes, use recommended defaults
No, reuse previous settings
No, customize settings
```

### Opción 1: Recommended defaults

Si eliges `Yes, use recommended defaults`, las configuraciones recomendadas incluyen:

- TypeScript
- ESLint
- Tailwind CSS
- App Router
- Turbopack
- AGENTS.md

Sin realizar más preguntas, además no crea la carpeta `src` ni utiliza React Compiler.

La estructura principal queda similar a:

```
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
│   └── favicon.ico
├── package.json
├── tsconfig.json
└── README.md
```

### Opción 2: Customize Settings

Si eliges `No, customize settings`, aparecerán las preguntas individuales para configurar tu proyecto.

- Would you like to use TypeScript? **(Yes)**, Desde hace años es el estándar de facto en proyectos Next.js profesionales.
- Which linter would you like to use? **(ESLint)**, La opción tradicional.
- Would you like to use React Compiler? **(No)**, React Compiler busca reducir la necesidad de usar `useMemo`, `useCallback`, etc, automatizando optimizaciones de renderizado.
- Would you like to use Tailwind CSS? **(Yes)**, Actualmente es la solución CSS más utilizada dentro del ecosistema Next.js.
- Would you like your code inside a src directory? **(Yes)**, La ventaja es mantener separada la lógica del proyecto respecto a los archivos de configuración.
- Would you like to use App Router? **(Yes)**, App Router es el sistema moderno de enrutamiento introducido en Next.js 13, actualmente es la opción estándar utilizada en Next.js 16.
- Would you like to customize the import alias (`@/*` by default)? **(Yes)**, Permite usar `@/components` en lugar de `../../components`.
- What import alias would you like configured? **@/**, es la convención más utilizada.
- Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? **(No)**, aún no es necesario.

Después de responder las preguntas, tendras una estructura similar a la siguiente:

```plaintext
my-next-app/
├─ public/
├─ src/
│   ├─ app/
│   │   ├─ layout.tsx
│   │   ├─ page.tsx
│   │   └─ globals.css
│   └─ ...
├─ package.json
├─ next.config.ts
├─ tsconfig.json
└─ ...
```

## ¿Qué es Turbopack?

Turbopack es el bundler moderno de Next.js desarrollado por Vercel y escrito en Rust. Su objetivo es reemplazar gradualmente a Webpack ofreciendo tiempos de compilación y recarga mucho más rápidos durante el desarrollo. Utiliza una arquitectura incremental que recompila únicamente las partes del proyecto que han cambiado, lo que reduce significativamente la espera al guardar archivos. Desde Next.js 16, Turbopack es el bundler predeterminado tanto para desarrollo como para producción, convirtiéndose en la opción recomendada para la mayoría de proyectos nuevos.

## Abrir la aplicación

Primero necesitas entrar al proyecto, ejecuta el siguiente comando para ir al directorio del proyecto:

```bash
cd my-next-app
```

Luego puedes iniciar el servidor, ejecutando

```bash
npm run dev
```

Verás algo similar en la consola:

```plaintext
▲ Next.js 16.0.0
- Local: http://localhost:3000
```

Para abrir la aplicación visita `http://localhost:3000` en tu navegador.

Aparecerá la página inicial de Next.js.

## Directorios y archivos principales del proyecto

Cuando creas un proyecto con Next.js, se genera una estructura inicial con carpetas y archivos que tienen funciones específicas.

```plaintext
my-next-app/
├─ app/
│   ├─ favicon.ico
│   ├─ layout.tsx
│   ├─ page.tsx
│   └─ globals.css
├─ node_modules/
├─ public/
├─ .gitignore
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tsconfig.json
└─ ...
```

### app/

Es la carpeta principal de la aplicación cuando utilizas App Router.

Aquí se definen:

- Páginas
- Layouts
- Rutas
- Componentes de servidor
- Componentes de cliente

Ejemplo:

```plaintext
app/
├─ page.tsx
├─ layout.tsx
├─ about/
│  └─ page.tsx
└─ contact/
   └─ page.tsx
```

Genera automáticamente las rutas:

```plaintext
/
/about
/contact
```

### favicon.ico

Icono que aparece en:

- Pestañas del navegador
- Marcadores
- Historial

Por defecto Next.js genera uno de ejemplo.

```plaintext
app/
└─ favicon.ico
```

### layout.tsx

Es el layout raíz de la aplicación.

Se renderiza una sola vez y envuelve todas las páginas.

Ejemplo:

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

Aquí normalmente se agregan:

- Navbar
- Footer
- Providers
- Contextos globales
- Metadata

### page.tsx

Representa una página de la aplicación.

```typescript
export default function HomePage() {
  return <h1>Hola Next.js</h1>;
}
```

Corresponde a la ruta:

```plaintext
/
```

### globals.css

Archivo CSS global.

Aquí suelen colocarse:

- Reset CSS
- Variables CSS
- Estilos globales
- Configuración de Tailwind

Ejemplo:

```css
body {
  margin: 0;
}
```

### node_modules/

Contiene todas las dependencias instaladas mediante npm.

Ejemplos:

- react
- next
- typescript
- tailwindcss

Normalmente:

- No se modifica manualmente.
- No se sube a Git.

Se puede regenerar con:

```bash
npm install
```

### public/

Contiene archivos estáticos accesibles desde el navegador.

Ejemplos:

```plaintext
public/
├─ logo.png
├─ avatar.jpg
└─ robots.txt
```

Uso:

```html
<img src="/logo.png" />
```

La URL final será:

```plaintext
http://localhost:3000/logo.png
```

### .gitignore

Indica qué archivos Git debe ignorar.

Ejemplo:

```plaintext
node_modules
.next
.env
```

Evita subir archivos innecesarios o sensibles.

### eslint.config.mjs

Configuración de ESLint.

Permite:

- Detectar errores
- Mantener buenas prácticas
- Aplicar reglas de calidad

Ejemplo:

```javascript
export default [
  // reglas
];
```

### next-env.d.ts

Archivo generado automáticamente por Next.js.

Permite que TypeScript reconozca los tipos propios de Next.js.

Ese archivo no se suele modificarse manualmente.

### next.config.ts

Archivo principal de configuración de Next.js.

Ejemplo:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

Aquí pueden configurarse:

- Imágenes remotas
- Headers
- Redirects
- Variables experimentales
- Configuración avanzada

### package-lock.json

Archivo generado automáticamente por npm.

Guarda las versiones exactas de todas las dependencias instaladas.

Esto garantiza que todos los desarrolladores instalen exactamente las mismas versiones.

### package.json

Es uno de los archivos más importantes del proyecto.

Contiene:

- Nombre del proyecto
- Dependencias
- Scripts
- Versión

Ejemplo:

```json
{
  "name": "my-next-app",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

Desde aquí se ejecutan comandos como:

```bash
npm run dev
npm run build
npm run start
```

### postcss.config.mjs

Configuración de PostCSS.

Tailwind CSS utiliza este archivo durante el proceso de compilación.

Ejemplo:

```javascript
const config = {
  plugins: {},
};

export default config;
```

Normalmente no requiere modificaciones frecuentes.

### README.md

Documentación inicial del proyecto.

Se muestra automáticamente en repositorios de GitHub.

Suele incluir:

- Descripción
- Instalación
- Uso
- Scripts disponibles

### tsconfig.json

Configuración de TypeScript.

Define cómo TypeScript compila y analiza el proyecto.

Ejemplo:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Aquí se configuran aspectos como:

- Alias de importación
- Strict Mode
- Paths
- Tipos

### .next/

Esta carpeta aparece después de ejecutar:

```bash
npm run dev
```

o

```bash
npm run build
```

Contiene:

- Archivos compilados
- Caché
- Bundles generados por Turbopack

Los archivos contenidos no deben editarse manualmente.

Normalmente está incluida en `.gitignore`.

## Server Components

Una de las características más importantes de Next.js moderno es el uso de **React Server Components (RSC)**.

Por defecto, todos los componentes dentro de `app/` son **Server Components**.

```tsx
export default function HomePage() {
  return <h1>Hola Mundo</h1>;
}
```

No necesitan:

```tsx
"use client";
```

porque se ejecutan en el servidor.

## ¿Qué es un Server Component?

Es un componente React que:

- Se ejecuta en el servidor.
- Genera HTML en el servidor.
- No envía JavaScript innecesario al navegador.
- Puede acceder directamente a bases de datos.
- Puede hacer consultas mediante `fetch()`.
- Puede leer variables de entorno privadas.

Ejemplo:

```tsx
export default async function ProductsPage() {
  const products = await fetch("https://api.com/products").then((res) =>
    res.json(),
  );

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

## Ventajas de los Server Components

### Menor JavaScript enviado al navegador

El usuario descarga menos código.

```plaintext
Menos KB
↓
Carga más rápida
↓
Mejor rendimiento
```

### Mejor SEO

El HTML ya viene generado desde el servidor.

Los buscadores pueden indexar el contenido inmediatamente.

### Acceso directo a recursos del servidor

Puedes usar:

```tsx
Prisma;
PostgreSQL;
MongoDB;
Redis;
Filesystem;
```

sin exponer credenciales al navegador.

### Menos uso de useEffect

En React tradicional era común:

```tsx
useEffect(() => {
  fetchData();
}, []);
```

En Next.js moderno normalmente hacemos:

```tsx
const data = await fetch(...);
```

directamente en el componente servidor.

## Renderizado Estático

Si Next.js detecta que una página puede generarse una sola vez, realizará:

```plaintext
Static Rendering
```

o

```plaintext
Static Site Generation (SSG)
```

Ejemplo:

```tsx
export default async function Page() {
  const posts = await fetch("https://api.com/posts");

  return <div>...</div>;
}
```

Si la información no depende del usuario ni de cookies, Next.js puede generar la página durante el build.

Resultado:

```plaintext
HTML generado previamente
↓
Respuesta instantánea
```

## Renderizado Dinámico

Si una página depende de:

```tsx
cookies();
headers();
searchParams;
request;
```

Next.js cambia automáticamente a:

```plaintext
Dynamic Rendering
```

La página se genera en cada petición.

## Fetch Cache

En Next.js, `fetch()` tiene caché integrada.

Ejemplo:

```tsx
const data = await fetch(url);
```

Por defecto:

```plaintext
cache: "force-cache"
```

Esto permite reutilizar datos y mejorar el rendimiento.

### Sin Caché

```tsx
await fetch(url, {
  cache: "no-store",
});
```

Equivale a:

```plaintext
Siempre consultar nuevamente
```

Similar a SSR tradicional.

## Estrategias de Caché

### revalidate

Permite regenerar contenido cada cierto tiempo.

```tsx
export const revalidate = 60;
```

Significa:

```plaintext
Generar página
↓
Guardar caché
↓
Revalidar cada 60 segundos
```

Esto es:

```plaintext
ISR
Incremental Static Regeneration
```

## Variables de Configuración de Ruta

Se colocan normalmente al inicio del archivo:

```tsx
page.tsx;
layout.tsx;
route.ts;
```

### dynamic

Controla si la ruta es estática o dinámica.

```tsx
export const dynamic = "auto";
```

Opciones:

```tsx
export const dynamic = "auto";
export const dynamic = "force-static";
export const dynamic = "force-dynamic";
export const dynamic = "error";
```

#### force-static

```tsx
export const dynamic = "force-static";
```

Siempre genera HTML estático.

#### force-dynamic

```tsx
export const dynamic = "force-dynamic";
```

Siempre renderiza en cada petición.

Equivalente al SSR clásico.

### dynamicParams

Controla rutas dinámicas.

Ejemplo:

```plaintext
/blog/[slug]
```

```tsx
export const dynamicParams = true;
```

Opciones:

```tsx
true;
false;
```

#### false

Solo permite rutas generadas por:

```tsx
generateStaticParams();
```

Si no existe:

```plaintext
404
```

### revalidate

Controla la regeneración automática.

```tsx
export const revalidate = 3600;
```

```plaintext
1 hora
```

### fetchCache

Controla cómo se comportan los fetch de una ruta.

```tsx
export const fetchCache = "auto";
```

Opciones comunes:

```tsx
"auto";
"default-cache";
"force-cache";
"force-no-store";
```

### runtime

Define dónde se ejecutará la ruta.

```tsx
export const runtime = "nodejs";
```

Opciones:

```tsx
"nodejs";
"edge";
```

#### nodejs

Acceso completo a:

```plaintext
Prisma
Filesystem
Node APIs
```

#### edge

Se ejecuta cerca del usuario.

Menor latencia.

Pero con ciertas limitaciones respecto a Node.js.

### preferredRegion

Permite indicar la región ideal para ejecutar la ruta.

```tsx
export const preferredRegion = "iad1";
```

Ejemplos:

```tsx
"home";
"global";
"auto";
"iad1";
```

Se utiliza principalmente en despliegues sobre Vercel.

## Client Components

Los Client Components son componentes que se ejecutan en el navegador.

Se identifican mediante:

```tsx
"use client";
```

Ejemplo:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>,
}
```

## ¿Cuándo usar Client Components?

Cuando necesites:

- `useState`
- `useEffect`
- `useReducer`
- Eventos (`onClick`, `onChange`)
- APIs del navegador
- LocalStorage
- WebSockets
- Drag & Drop
- Animaciones complejas

## Regla práctica moderna

La filosofía actual de Next.js es:

```plaintext
Server Components por defecto.
Client Components únicamente cuando sean necesarios.
```

O dicho de otra forma:

```plaintext
Datos → Servidor

Interactividad → Cliente
```

La mayoría de páginas, layouts, consultas a base de datos, llamadas a APIs y renderizado inicial deberían permanecer como **Server Components**.

Solo los elementos que requieren interacción directa del usuario (formularios interactivos, modales, dropdowns, tabs, contadores, drag & drop, etc.) deberían marcarse con:

```tsx
"use client";
```

Por eso es común escuchar que en una aplicación Next.js moderna, más del 90% de los componentes pueden ser Server Components y solo una pequeña parte necesita ejecutarse en el navegador.
