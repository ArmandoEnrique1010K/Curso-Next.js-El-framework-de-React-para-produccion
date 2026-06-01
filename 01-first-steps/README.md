# ¿Qué es Next.js?

Next.js es un framework basado en React que amplía las capacidades de una aplicación React tradicional. Permite crear desde sitios web estáticos hasta aplicaciones complejas con renderizado en servidor, optimización automática y herramientas integradas para producción.

Una forma sencilla de verlo es:

> **Next.js te permite hacer todo lo que ya sabes hacer en React, pero agregando mejores opciones de rendimiento, SEO, renderizado, enrutamiento y despliegue.**

---

# Es un framework poderoso para servir contenido estático y generado desde el lado del servidor

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

---

# Puedes hacer todo lo que sabes en React, más mejoras importantes

Si ya conoces React:

```jsx
function Home() {
  return <h1>Hola mundo</h1>;
}
```

Ese mismo conocimiento sigue siendo válido en Next.js.

Pero además obtienes:

## Mejor rendimiento

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

---

## SEO mejorado

Los motores de búsqueda pueden leer el contenido desde el servidor sin depender de JavaScript.

---

## Router integrado

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

---

## Separación automática de código

Cada página genera su propio bundle.

No todo el código se envía al navegador desde el inicio.

---

# ¿Por qué se recomienda usar Next.js?

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

---

# Next.js cambia el paradigma de las SPA

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

---

# ¿Cómo funciona una SPA?

En React tradicional sucede algo así:

## Paso 1

El navegador solicita:

```plaintext
https://midominio.com
```

---

## Paso 2

El servidor responde:

```html
<body>
  <div id="root"></div>
</body>
```

Prácticamente vacío.

---

## Paso 3

Se descarga JavaScript:

```plaintext
main.js
vendors.js
runtime.js
```

---

## Paso 4

React construye la interfaz en el navegador.

---

## Resultado

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

---

# ¿Por qué una SPA no es SEO Friendly?

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

---

# ¿Por qué es importante el SEO?

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

---

# Estrategias de renderizado de Next.js

## CSR (Client Side Rendering)

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

---

## SSR (Server Side Rendering)

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

---

## SSG (Static Site Generation)

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

---

## ISR (Incremental Static Regeneration)

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

---

## DR (Dynamic Routing)

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

---

# Resumen

Next.js es un framework de React que permite crear aplicaciones web modernas utilizando múltiples estrategias de renderizado. Mientras que React tradicionalmente genera SPA que pueden presentar limitaciones de SEO y rendimiento inicial, Next.js ofrece SSR, SSG, ISR y rutas dinámicas para elegir la mejor estrategia según cada página. Esto mejora la velocidad de carga, la indexación en buscadores, la experiencia del usuario y la escalabilidad de la aplicación, manteniendo toda la experiencia de desarrollo que ya conoces de React.

---

---

---

## Crear un proyecto de Next.js

La forma recomendada actualmente es utilizar el comando:

```bash
npx create-next-app@latest
```

Este comando descarga temporalmente la herramienta oficial de creación de proyectos de Next.js y genera toda la estructura inicial.

---

Si te pide instalar 'create-next-app@16.2.6' pulsa Y y Enter,

## Paso 1: Verificar Node.js

Antes de crear el proyecto, verifica que tengas instalado Node.js:

```bash
node -v
npm -v
```

Si no está instalado, puedes obtenerlo desde:

[Node.js Official Website](https://nodejs.org?utm_source=chatgpt.com)

---

## Paso 2: Crear el proyecto

Ejecuta:

```bash
npx create-next-app@latest
```

Luego te pregunta 'Would you like to use the recommended Next.js defaults?, si seleccionas 'Yes, use recommended defaults', se omitirán las siguientes preguntas:

- TypeScript
- ESLint
- No React Compiler
- Tailwind CSS
- No src/ directory
- App Router
- AGENTS.md

Y se instalarán las dependencias automáticamente tanto dependencies como devDependencies.

---

Pero si eliges la opción 'No, customize settings' El asistente hará varias preguntas.

---

## Paso 3: Responder las preguntas del asistente

### Nombre del proyecto

```plaintext
What is your project named?
```

Ejemplo:

```plaintext
my-next-app
```

---

### TypeScript

```plaintext
Would you like to use TypeScript?
```

Recomendado:

```plaintext
Yes
```

Actualmente TypeScript es prácticamente el estándar en proyectos Next.js profesionales.

---

### ESLint

```plaintext
Would you like to use ESLint?
```

Recomendado:

```plaintext
Yes
```

Ayuda a detectar errores y mantener buenas prácticas.

---

### Tailwind CSS

```plaintext
Would you like to use Tailwind CSS?
```

Recomendado:

```plaintext
Yes
```

Desde Next.js moderno es muy común utilizar Tailwind.

---

### Código dentro de src

```plaintext
Would you like your code inside a src directory?
```

Recomendado:

```plaintext
Yes
```

Generará:

```plaintext
src/
 ├─ app/
 ├─ components/
 └─ ...
```

en lugar de colocar todo en la raíz.

---

### App Router

```plaintext
Would you like to use App Router?
```

Recomendado:

```plaintext
Yes
```

App Router es el sistema moderno introducido en Next.js 13 y utilizado en Next.js 16.

---

### Turbopack

```plaintext
Would you like to use Turbopack for next dev?
```

Recomendado:

```plaintext
Yes
```

Es el reemplazo moderno de Webpack para desarrollo.

---

### Alias de importación

```plaintext
Would you like to customize the import alias?
```

Normalmente:

```plaintext
No
```

Se usará:

```plaintext
@/*
```

Por ejemplo:

```tsx
import Button from "@/components/Button";
```

---

## Resultado

Después de responder las preguntas:

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

---

## Paso 4: Entrar al proyecto

```bash
cd my-next-app
```

---

## Paso 5: Iniciar el servidor

```bash
npm run dev
```

Verás algo similar a:

```plaintext
▲ Next.js 16.0.0
- Local: http://localhost:3000
```

---

## Paso 6: Abrir la aplicación

Visita:

```plaintext
http://localhost:3000
```

Aparecerá la página inicial de Next.js.

---

## Comando completo sin preguntas

Si ya sabes exactamente qué configuración deseas, puedes crear el proyecto directamente:

```bash
npx create-next-app@latest my-next-app \
  --typescript \
  --tailwind \
  --eslint \
  --src-dir \
  --app \
  --turbopack
```

Esto genera un proyecto moderno con:

- TypeScript
- Tailwind CSS
- ESLint
- Carpeta `src`
- App Router
- Turbopack

Es una configuración muy cercana a la que se utiliza actualmente en proyectos profesionales de Next.js.
