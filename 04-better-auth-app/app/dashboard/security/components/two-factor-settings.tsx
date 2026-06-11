"use client";

import { useState } from "react";
import { PasswordConfirmModal } from "./password-confirm-modal";
import { TwoFactorSetup } from "./two-factor-setup";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type TwoFactorSettingsProps = {
  isEnabled?: boolean;
};

type SetupData = {
  totpUri: string;
  secretKey: string;
  backupCodes: string[];
};

// Datos de ejemplo para el diseño. Se reemplazarán por la respuesta del servidor.
const MOCK_SETUP_DATA: SetupData = {
  totpUri:
    "otpauth://totp/DemoApp:usuario@ejemplo.com?secret=JBSWY3DPEHPK3PXP&issuer=DemoApp",
  secretKey: "JBSWY3DPEHPK3PXP",
  backupCodes: [
    "8f3a-2b1c",
    "d4e5-6f7a",
    "1c2d-3e4f",
    "9a8b-7c6d",
    "5e4f-3a2b",
    "7c8d-9e0f",
    "2b3c-4d5e",
    "6f7a-8b9c",
  ],
};

export function TwoFactorSettings({
  isEnabled = false,
}: TwoFactorSettingsProps) {
  const router = useRouter();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalAction, setModalAction] = useState<"enable" | "disable">(
    "enable",
  );
  const [setupData, setSetupData] = useState<SetupData | null>(null);

  function handleOpenPasswordModal(action: "enable" | "disable") {
    setModalAction(action);
    setShowPasswordModal(true);
  }

  function handleClosePasswordModal() {
    setShowPasswordModal(false);
  }

  // HABILITAR TWO FACTOR AUTHENTICATION
  // https://better-auth.com/docs/plugins/2fa#enabling-2fa

  async function handlePasswordConfirmed(_password: string) {
    setShowPasswordModal(false);
    console.log(_password);

    if (modalAction === "enable") {
      // Llamar al servidor con la contraseña y usar su respuesta
      // setSetupData(MOCK_SETUP_DATA);

      // La función enable() retorna un objeto con los datos necesarios para configurar el 2FA
      const { data, error } = await authClient.twoFactor.enable({
        // Debe ser la contraseña del usuario que ha iniciado sesión
        password: _password,
        // issuer: "my-app-name",
      });

      // Usualmente el error se muestra cuando la contraseña es incorrecta
      console.log({ data, error });

      // Si la contraseña es correcta, entonces el objeto data contendrá los datos necesarios:
      // backupCodes: arreglo de strings que contiene los codigos de recuperación
      // totpUri: string que contiene la URI para escanear el código QR

      // En la base de datos, en la tabla twoFactor se tiene el campo verified en false, lo que
      // indica que el usuario ha configurado el 2FA pero no lo ha verificado.

      // Muestra un alert con el mensaje de error
      if (error) {
        // Muestra el mensaje de error que devuelve el servidor
        alert(error.message);
        return;
      }

      // Si la respuesta es exitosa, entonces el objeto data contendrá los datos necesarios
      // para mostrar el código QR y los códigos de recuperación

      // Pasa los datos requeridos en el estado de setupData
      setSetupData({
        totpUri: data.totpURI,

        // Se le manda el mismo valor que se usa en totpUri
        secretKey: data.totpURI,
        backupCodes: data.backupCodes,
      });

      return;
    }

    // DESACTIVAR 2FA, Solamente requeire la contraseña del usuario
    const { error } = await authClient.twoFactor.disable({
      password: _password,
    });

    if (error) {
      alert("2FA no se pudo desactivar");
      return;
    }

    alert("2FA desactivado correctamente");
    // Limpiar el estado de setupData
    setSetupData(null);
    // Recargar la página para actualizar el estado
    router.refresh();

    // Al desactivar el 2FA, en la base de datos se debe eliminar el registro
    // por el correo del usuario que ha desactivado el 2FA en la tabla twoFactor

    // Si quieres volver a activar el 2FA, debes volver a escanear el código QR
    // generado porque cambia cada vez que se activa el 2FA
  }

  function handleCancelSetup() {
    setSetupData(null);
  }

  // Función que se ejecuta cuando el usuario completa la configuración del 2FA
  async function handleCompleteSetup(verificationCode: string) {
    // TODO: confirmar activación en el servidor
    // Imprime los 6 digitos introducidos
    console.log({ verificationCode });

    // VERIFICAR EL CÓDIGO DE AUTENTICACIÓN
    // https://better-auth.com/docs/plugins/2fa#verifying-totp
    const { data, error } = await authClient.twoFactor.verifyTotp({
      // Coloca aqui los 6 digitos
      code: verificationCode,
      // Si fuera true, entonces por 30 dias no se pedirá el código de verificación
      // de lo contrario no volvera a pedirlo
      trustDevice: false,
    });

    if (error) {
      alert(error.message);
      console.log({ error });
      return;
    }

    console.log({ data, error });

    // NOTA: TEN EN CUENTA QUE SOLAMENTE PODRAS USAR EL CÓDIGO DE VERIFICACIÓN UNA VEZ
    // POR LO TANTO, SI LO USAS Y NO FUNCIONA, TENDRÁS QUE GENERAR UN NUEVO CÓDIGO, ES
    // DECIR, VOLVER A ESCANEAR EL CÓDIGO QR EN LA APP DE MICROSOFT AUTHENTICATOR

    alert("2FA activado correctamente");
    setSetupData(null);

    // Una vez activado, en la base de datos, en la tabla twoFactor, el campo verified
    // se establecerá en true, indica que ya se activo la 2FA

    // Recargar la página para asegurar de que el estado se actualice
    router.refresh();
  }

  const modalCopy =
    modalAction === "enable"
      ? {
          title: "Confirma tu contraseña",
          description:
            "Antes de activar la autenticación en dos pasos, necesitamos verificar que eres tú.",
          confirmLabel: "Activar 2FA",
        }
      : {
          title: "Confirma tu contraseña",
          description:
            "Antes de desactivar la autenticación en dos pasos, necesitamos verificar que eres tú.",
          confirmLabel: "Desactivar 2FA",
        };

  return (
    <div className="space-y-6">
      <StatusCard isEnabled={isEnabled} />

      {setupData ? (
        // Pasale los datos del 2FA al componente TwoFactorSetup
        <TwoFactorSetup
          totpUri={setupData.totpUri}
          secretKey={setupData.secretKey}
          backupCodes={setupData.backupCodes}
          onComplete={handleCompleteSetup}
          onCancel={handleCancelSetup}
        />
      ) : !isEnabled ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ¿Por qué activar 2FA?
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              "Protege tu cuenta aunque alguien conozca tu contraseña.",
              "Añade un segundo factor con una app como Google Authenticator o Authy.",
              "Reduce el riesgo de accesos no autorizados a tu panel.",
            ].map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  aria-hidden
                >
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => handleOpenPasswordModal("enable")}
            className="mt-6 h-11 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Activar autenticación en dos pasos
          </button>
        </section>
      ) : (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            La autenticación en dos pasos está activa en tu cuenta.
          </p>

          {/* Botón para desactivar 2FA */}
          <button
            type="button"
            onClick={() => handleOpenPasswordModal("disable")}
            className="mt-4 h-11 rounded-lg border border-zinc-300 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Desactivar autenticación en dos pasos
          </button>
        </section>
      )}

      {/* Modal para confirmar la contraseña */}
      <PasswordConfirmModal
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        onConfirm={handlePasswordConfirmed}
        title={modalCopy.title}
        description={modalCopy.description}
        confirmLabel={modalCopy.confirmLabel}
      />
    </div>
  );
}

function StatusCard({ isEnabled }: { isEnabled: boolean }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800"
            aria-hidden
          >
            <ShieldIcon />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Autenticación en dos pasos (2FA)
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {isEnabled
                ? "Tu cuenta requiere un código de verificación al iniciar sesión."
                : "La autenticación en dos pasos no está configurada en tu cuenta."}
            </p>
          </div>
        </div>
        <span
          className={
            isEnabled
              ? "rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              : "rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }
        >
          {isEnabled ? "Activo" : "Desactivado"}
        </span>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 text-zinc-700 dark:text-zinc-300"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}
