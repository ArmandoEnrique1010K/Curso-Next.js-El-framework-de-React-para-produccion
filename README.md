# Curso-Next.js-El-framework-de-React-para-produccion

Curso de Next.js de Fernando Herrera

## Instalaciones recomendadas

En lugar del IDE Visual Studio Code, se utilizara Windsurf.

Consulta aqui la [Lista de instalaciones](https://gist.github.com/klerith/2d46749155918952b593e952dc7cf5c8#extensiones-de-vscode).

## Configuración del Marketplace de Extensiones

Por defecto, Windsurf utiliza su propio marketplace de extensiones. En algunos casos, este catálogo puede no contener las versiones más recientes de determinadas extensiones o puede no incluir todas las extensiones disponibles en Visual Studio Code.

Para acceder al marketplace oficial de Visual Studio Code, realiza la siguiente configuración:

1. Abre Windsurf, ve al menú File → Preferences → Windsurf Preferences.
2. Busca la opción **Marketplace Extension Gallery Service URL** y reemplaza su valor por: `https://marketplace.visualstudio.com/_apis/public/gallery`
3. Busca la opción **Marketplace Gallery Item URL** y reemplaza su valor por: `https://marketplace.visualstudio.com/items`
4. Cierra completamente Windsurf y vuelve a abrirlo para aplicar los cambios.
5. Abre la sección de Extensions o extensiones, si la configuración fue aplicada correctamente, deberías observar una indicación similar a **Using marketplace.visualstudio.com**

### Instalación de Extensiones

Una vez configurado el marketplace oficial de Visual Studio Code, podrás instalar las extensiones recomendadas desde:

https://gist.github.com/klerith/2d46749155918952b593e952dc7cf5c8#extensiones-de-vscode

### Motivo de esta configuración

Se utiliza el marketplace oficial de Visual Studio Code porque:

- Dispone de un catálogo más amplio de extensiones.
- Las actualizaciones suelen estar disponibles antes que en otros marketplaces.
- Algunas extensiones populares no se encuentran disponibles o actualizadas en el marketplace predeterminado de Windsurf.
- Permite mantener una experiencia más cercana a la de Visual Studio Code.

### Instalar la extensión Tailwind CSS IntelliSense

La extensión **Tailwind CSS IntelliSense** no está disponible actualmente en el marketplace de Windsurf, por lo que debe instalarse manualmente mediante un archivo VSIX.

1. Accede a la siguiente página:
   https://marketplace.windsurf.com/extension/bradlc/vscode-tailwindcss

2. Haz clic en el botón **Download** para descargar el archivo **.vsix** de la extensión.

3. Abre **Windsurf** y dirígete a la sección **Extensions**.

4. En la parte superior derecha del panel de extensiones, haz clic en el botón **Views and More Actions** (icono de tres puntos).

5. Selecciona la opción **Install from VSIX...**.

6. Busca y selecciona el archivo **.vsix** que descargaste previamente.

Una vez completados estos pasos, Windsurf instalará la extensión automáticamente y podrás disfrutar de autocompletado, sugerencias y soporte para clases de Tailwind CSS.