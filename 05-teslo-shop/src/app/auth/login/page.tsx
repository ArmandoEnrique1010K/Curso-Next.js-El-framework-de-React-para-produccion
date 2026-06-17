import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

// Página de inicio de sesión del lado del servidor
export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>
      {/* El formulario de login es un componente del lado del cliente */}
      <LoginForm />
    </div>
  );
}
