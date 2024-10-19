import { create } from "zustand";
import { CartItemQuantityOperation } from "@/constants/enum";
import { createJSONStorage, persist } from "zustand/middleware";

export type TCartItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
};

interface CartStoreType {
    cartItems: TCartItem[] | [];
    addToCart: (item: TCartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, operation: string, quantity?: number) => void;
}

const useCartStore = create<CartStoreType>()(
    persist(
        (set) => ({
            cartItems: [],
            addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
            removeFromCart: (id) =>
                set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) })),
            updateQuantity: (id, operation, quantity) => {
                if (operation === CartItemQuantityOperation.ADD) {
                    set((state) => ({
                        cartItems: state.cartItems.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    }));
                } else if (operation === CartItemQuantityOperation.SUBTRACT) {
                    set((state) => ({
                        cartItems: state.cartItems.map((item) =>
                            item.id === id
                                ? item.quantity > 1
                                    ? { ...item, quantity: item.quantity - 1 }
                                    : item
                                : item
                        )
                    }));
                } else if (operation === CartItemQuantityOperation.SET && quantity) {
                    set((state) => ({
                        cartItems: state.cartItems.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        )
                    }));
                }
            }
        }),
        {
            name: "cart-items",
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useCartStore;
