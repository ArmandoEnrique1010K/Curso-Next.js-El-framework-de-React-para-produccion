"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

// Es un HOC (High Order Component) que envuelve el SessionProvider
export default function AuthProvider({ children, ...rest }: Props) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}
