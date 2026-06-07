import Link from "next/link";
import { IoCafeOutline } from "react-icons/io5";

interface Props {
  title: string;
  subtitle?: string;
  label?: string;
  icon?: React.ReactNode; // o un JSX.Element
  href?: string;
}

export const SimpleWidget = ({ title, subtitle, label, icon, href }: Props) => {
  return (
    <div className="bg-white shadow-xl p-3 sm:min-w-[25%] min-w-full  rounded-2xl border border-gray-50 mx-2 my-2">
      <div className="flex flex-col">
        {/* Solamente muestra este elemento si label es diferente de undefined o string vacío */}
        {label && (
          <div>
            <h2 className="font-bold text-gray-600 text-center">{label}</h2>
          </div>
        )}
        <div className="my-3">
          <div className="flex flex-row items-center justify-center space-x-1 ">
            {icon}
            <div id="temp" className="text-center">
              <h4 className="text-4xl">{title}</h4>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>

        {href && (
          <Link href={href}>
            <div className="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
              <span className="text-indigo-600 text-xs font-medium">Más</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
