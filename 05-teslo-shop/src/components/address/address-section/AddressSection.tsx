"use server";
import { getCountries, getUserAddress } from "@/actions";
import { AddressForm } from "@/app/(shop)/checkout/address/ui/AddressForm";
import { auth } from "@/auth.config";

export const AddressSection = async () => {
  // Llama al server action para obtener la lista de paises
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  // Obtiene la dirección del usuario desde el server action
  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;
  // console.log(userAddress);

  return (
    <AddressForm
      countries={countries}
      // null y undefined no son lo mismo
      // prisma utiliza null y no undefined
      userStoreAddress={userAddress}
    />
  );
};
