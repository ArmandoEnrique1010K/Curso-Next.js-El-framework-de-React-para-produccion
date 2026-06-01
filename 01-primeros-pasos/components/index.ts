// Este archivo index.ts es un archivo de exportación o de barril
// que permite exportar todos los componentes de la carpeta components
export * from './navbar/Navbar';
// export * from './active-link/ActiveLink';

// Para exportar un client component, se recomienda no usar la sintaxis de exportación por defecto
// ya que puede causar problemas de importación
export { ActiveLink } from './active-link/ActiveLink';