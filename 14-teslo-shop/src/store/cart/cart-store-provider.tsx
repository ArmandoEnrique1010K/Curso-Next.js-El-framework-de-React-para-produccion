// Create a new file: src/store/cart/cart-store-provider.tsx
"use client";

import { useEffect } from "react";
import { useCartStore } from "./cart-store";

export const CartStoreProvider = ({ children }: { children: React.ReactNode }) => {
    const hasHydrated = useCartStore((state) => state.hasHydrated);
    const setHasHydrated = useCartStore((state) => state.setHasHydrated);

    useEffect(() => {
        useCartStore.persist.rehydrate();
    }, []);

    useEffect(() => {
        setHasHydrated(true);
    }, [setHasHydrated]);

    if (!hasHydrated) {
        return <div>Loading cart...</div>;
    }

    return <>{children}</>;
};
