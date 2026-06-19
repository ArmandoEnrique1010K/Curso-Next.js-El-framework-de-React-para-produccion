"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

// Server action para guardar la dirección del usuario
// Toma el tipado de Address definido en interfaces/address.interface.ts
export const setUserAddress = async (address: Address, userId: string) => {
  try {
    // Toma la nueva dirección retornada de la función createOrReplaceAddress
    const newAddress = await createOrReplaceAddress(address, userId);

    // Retorna la nueva dirección
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

// La dirección es 1 a 1, si ya se tiene un registro se tiene que actualizar de lo contrario
// se tiene que crear
const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    // Verifica si ya existe una dirección para el usuario
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addressToSave = {
      // El modo manual, es más verbose pero es más claro
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    // Si no existe, crea una nueva
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,

        // {
        //   // country no es compatible porque country en prisma es un objeto
        //  ...address,
        //  userId,
        // },
      });

      // Devuelve la nueva dirección
      return newAddress;
    } else {
      // Si existe, actualiza la dirección
      const updatedAddress = await prisma.userAddress.update({
        where: {
          // Buscar por userId
          userId,
        },
        // La data contiene la información que se guardara
        data: addressToSave,
      });

      return updatedAddress;
    }
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la dirección");
  }
};
