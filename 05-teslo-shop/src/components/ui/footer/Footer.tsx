import { titleFont } from "@/config/fonts";
import Link from "next/link";

// Pie de página

// Si se va a utilizar 'cacheComponents' en next.config.ts, debes separar los valores
// aleatorios fuera de la función del componente
const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/" className="mx-3">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span> | Shop</span>
        {/* <span>© {new Date().getFullYear()}</span> */}
        <span>© {currentYear}</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacidad & Legal
      </Link>

      <Link href="/" className="mx-3">
        Ubicaciones
      </Link>
    </div>
  );
};
