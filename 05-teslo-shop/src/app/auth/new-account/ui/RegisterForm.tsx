"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { login, registerUser } from "@/actions";
import { useState } from "react";

// Tipado de los campos del formulario
type FormInputs = {
  name: string;
  email: string;
  password: string;
};

// Formulario para registrar usuario
export const RegisterForm = () => {
  // Estado para un unico mensaje de error del formulario
  const [errorMessage, setErrorMessage] = useState("");

  // React hook form
  // Es una librería que permite manejar formularios de manera más sencilla
  // https://react-hook-form.com/get-started

  // Ejecuta npm i react-hook-form

  // useForm es una función que retorna un objeto con las propiedades que necesitas
  // para manejar el formulario, se define el tipado de los campos del formulario
  const {
    // register sirve para registrar un campo
    register,
    // handleSubmit es una función que se ejecuta cuando el formulario es enviado
    handleSubmit,
    // formState es un objeto que contiene el estado del formulario
    formState: { errors },
  } = useForm<FormInputs>();

  // onSubmit es una función que se ejecuta cuando el formulario es enviado
  // Como llama a un server action, debe ser una función asíncrona
  // El tipado de la función es SubmitHandler<FormInputs>
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Limpia el mensaje de error
    setErrorMessage("");

    // Desestructura los campos del formulario
    const { name, email, password } = data;

    // Imprime en consola los valores del formulario
    // console.log({ name, email, password });

    // Llama al server action para registrar usuario
    const resp = await registerUser(name, email, password);

    // Imprime la respuesta
    // console.log({ resp });

    // Si el server action retorna un error, muestra el mensaje
    if (!resp.ok) {
      setErrorMessage(resp.message);
      // Retorna para que no se ejecute el código siguiente
      return;
    }

    // Si se ha registrado al usuario, entonces debe llamar al server
    // action para iniciar sesión (login)
    // Recordar que email debe ser convertido a minusculas
    await login(email.toLowerCase(), password);

    // Redirecciona en el lado del cliente con window.location.replace
    // Recarga el navegador web
    // route.replace('/')
    window.location.replace("/");
  };

  return (
    // En el evento onSubmit se ejecuta la función handleSubmit
    // que a su vez ejecuta la función onSubmit
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Puedes mostrar el error en el campo name por tipo de error */}
      {/* {
        errors.name?.type === 'required' && (
          <span className="text-red-500">* El nombre es obligatorio</span>
        )
      } */}

      <label htmlFor="email">Nombre completo</label>
      <input
        // Solamente muestra el borde rojo si el campo name tiene un error
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        type="text"
        // autoFocus hace que el campo se enfoque automáticamente
        autoFocus
        // Expande el objeto retornado por register
        // Coloca como primer parametro el nombre del campo y como segundo
        // parametro las reglas de validación, en este caso, campo requerido
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        // pattern contiene una expresión regular para validar el email
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        // minLength contiene el mínimo de caracteres para la contraseña
        {...register("password", { required: true, minLength: 6 })}
      />

      {/* Muestra el mensaje de error */}
      <span className="text-red-500">{errorMessage} </span>

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
