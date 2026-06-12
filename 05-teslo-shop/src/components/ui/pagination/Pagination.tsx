"use client";

// Código fuente tomado de: https://www.creative-tim.com/twcomponents/component/pagination-3

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";

interface Props {
  totalPages: number;
}

// Componente de páginación
export const Pagination = ({ totalPages }: Props) => {
  // Obtiene la ruta actual
  const pathname = usePathname();
  // console.log(pathname);
  // Posible valor: /

  const searchParams = useSearchParams();
  // console.log(searchParams);
  // Posible valor: ReadonlyURLSearchParams: { size: 1 }

  // console.log(searchParams.get("page"));
  // Posible valor: 5 (si tiene el queryParam 'page=5')

  // Obtiene la página actual desde la URL
  // const currentPage = Number(searchParams.get("page")) ?? 1;

  //

  // Si currentPage es 0, entonces también page será 0
  // Y en el páginador no se mostrará la página seleccionada
  // console.log({ currentPage, page: Number(searchParams.get("page")) });
  // Si no hay ningun queryParam: {currentPage: 0, page: 0}
  // Si hay un queryParam (?page=1): {currentPage: 1, page: 1}

  // Es por ello que se evalua si currentPage es 0 como valor falsy, entonces se establece en 1
  // const currentPage =
  //   Number(searchParams.get("page") ? searchParams.get("page") : 1) ?? 1;
  // console.log({ currentPage, page: Number(searchParams.get("page")) });
  // Si no hay ningun queryParam: {currentPage: 1, page: 0}

  // Pero si te vas a la página 'abc' (page=abc)
  // {currentPage: NaN, page: NaN}

  // Se tiene que evaluar
  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(currentPage)) {
    // Solamente si currentPage es una variable (let)
    // currentPage = 1;

    // Redireccionar a la página inicial sin queryParams en la URL
    redirect(pathname);
  }
  // console.log({ currentPage });
  // En resumen si te vas a "http://localhost:3000/?page=abc", el valor de currentPage es 1,
  // por lo que muestra la página 1 seleccionada

  //

  // Llama a la función para obtener todas los botones de navegación por página
  const allPages = generatePaginationNumbers(currentPage, totalPages);
  // console.log(allPages);
  // Si hay 5 páginas como maximo, devuelve: [1,2,3,4,5]

  // Construye la URL para navegar
  const createPageUrl = (pageNumber: number | string) => {
    // Crea una nueva instancia de URLSearchParams con los queryParams actuales
    const params = new URLSearchParams(searchParams);

    // Si es un string, se establece en la página actual
    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    // Si la página es menor o igual que 0 (número negativo),
    // se establece en la primera página
    if (+pageNumber <= 0) {
      return `${pathname}`;
      // href='/',  href='kid'
    }

    // Si ya no hay páginas disponibles se establece en la página actual
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    // Establece la página
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            {/* Enlace para navegar entre páginas */}
            {/* Página anterior */}
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {/* Mapea cada página y crea un enlace para navegar */}
          {allPages.map((page) => (
            <li key={page} className="page-item">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-sm text-white hover:bg-blue-700":
                      page === currentPage,
                  },
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            {/* Página siguiente */}
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
