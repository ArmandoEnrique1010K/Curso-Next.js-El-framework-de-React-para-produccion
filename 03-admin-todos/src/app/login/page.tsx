import { signIn } from "@/auth";

// Pagina personalizada para el inicio de sesión
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold">Iniciar sesión</h1>

        <div className="flex flex-col gap-4">
          {/* FORMULARIO DE CREDENCIALES */}
          <form
            action={async (formData) => {
              "use server";

              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/dashboard",
              });
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="usuario@correo.com"
                className="
          rounded-lg
          border
          border-slate-300
          px-4
          py-3
          outline-none
          transition
          focus:border-blue-500
        "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="
          rounded-lg
          border
          border-slate-300
          px-4
          py-3
          outline-none
          transition
          focus:border-blue-500
        "
              />
            </div>

            <button
              type="submit"
              className="
        rounded-lg
        bg-blue-600
        px-4
        py-3
        font-medium
        text-white
        transition
        hover:bg-blue-700
      "
            >
              Ingresar
            </button>
          </form>

          {/* SEPARADOR */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-slate-500">
                o continúa con
              </span>
            </div>
          </div>

          <form
            action={async () => {
              "use server";

              // Se redirecciona al dashboard después del inicio de sesión
              await signIn("github", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <button
              type="submit"
              className="
                w-full
                rounded-lg
                bg-gray-900
                px-4
                py-3
                font-medium
                text-white
                transition
                hover:bg-gray-800
              "
            >
              Ingresar con GitHub
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <button
              type="submit"
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-3
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              Ingresar con Google
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
