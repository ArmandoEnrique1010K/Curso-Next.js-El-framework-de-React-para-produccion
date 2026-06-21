"use client";

import { deleteUserAddress, setUserAddress } from "@/actions";
import type { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  // Prisma utiliza null y no undefined
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
};

interface Props {
  countries: Country[];
  // Dirección del usuario almacenada en el store
  // Partial indica que todas las propiedades de Address son opcionales
  userStoreAddress?: Partial<Address>;
}

// Formulario para la dirección de envío
export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  // Recordar el uso de React Hook Form
  const {
    handleSubmit,
    register,
    // isValid es un boolean que indica si el formulario es válido
    formState: { isValid },
    // Reinicia los valores del formulario
    reset,
  } = useForm<FormInputs>({
    // Valores por defecto
    defaultValues: {
      ...(userStoreAddress as any),
      // No va a recordar la dirección por defecto
      rememberAddress: false,
    },
  });

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  // porque se tiene la propiedad required en true
  const { data: session, status } = useSession({
    required: true,
  });

  // Obtiene el id del usuario autenticado
  // console.log(session?.user.id);

  // Estados globales
  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  const router = useRouter();

  useEffect(() => {
    // Si se tiene un valor almacenado en el store, se reinicia el formulario
    // y se establece el valor del formulario con el valor del store
    if (address.firstName) {
      reset(address);
    }
  }, []);

  const onSubmit = async (data: FormInputs) => {
    // Imprime un objeto con las propiedades del formulario, similar a:
    // { firstName: "Armando", lastName: "Enrique", ... }
    // campo: "valor introducido"
    // console.log(data);

    // Grabar los datos en el estado global
    // El tipado de ambos: data y address es el mismo, a excepción de rememberAddress
    // setAddress(data);

    // Usa el operador rest para tomar todas las propiedades excepto rememberAddress
    // Porque el tipado de address no incluye rememberAddress
    const { rememberAddress, ...restAddress } = data;

    // Se omite el campo rememberAddress porque no está en el tipado de address
    setAddress(restAddress);

    // Si el valor en el campo rememberAddress es true
    if (data.rememberAddress) {
      // Guardar la dirección en la base de datos (desde el server action)
      // El id del usuario se debe tomar del contexto de autenticaticación
      await setUserAddress(restAddress, session?.user.id!);
    } else {
      // De lo contrario se borrará la dirección del almacenamiento persistente
      await deleteUserAddress(session?.user.id!);
    }

    // Navega a la página
    router.push("/checkout");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          // Recordar que register registra el campo y required asegura que tenga un valor introducido
          {...register("firstName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("lastName", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("address", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("address2")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("city", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {/* <option value="PE">Perú</option>
          <option value="CRI">Costa Rica</option> */}

          {/* Itera con la lista de paises */}
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-gray-200"
          {...register("phone", { required: true })}
        />
      </div>

      {/* Checkbox */}
      {/* Código fuente obtenido de: https://www.creative-tim.com/twcomponents/component/tailwind-css-checkbox-by-material-tailwind */}
      <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            {/* Guarda la direccion actual del usuario en la base de datos */}
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              // checked es una propiedad booleana para marcar el checkbox
              // checked

              // Como rememberAddress es una propiedad booleana, solamente toma true si se marca el checkbox
              {...register("rememberAddress")}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                // No olvidar renombrar propiedades como stroke-width a strokeWidth
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>¿Recordar dirección?</span>
        </div>

        {/* <Link
            href="/checkout"
            className="btn-primary flex w-full sm:w-1/2 justify-center "
          >
            Siguiente
          </Link> */}

        {/* Se utiliza un botón en lugar de un Link para poder enviar el formulario */}
        <button
          // Deshabilita el botón si el formulario no es válido (cuando hay campos sin valores)
          disabled={!isValid}
          type="submit"
          // Aplica un estilo si todos los campos tienen valores (solamente los requeridos)
          className={clsx({
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
