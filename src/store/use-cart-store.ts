import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};

export enum CartItemQuantityOperation {
    ADD = 'add',
    SUBTRACT = 'subtract',
    SET = 'set'
}

// Define the type for your cart store
interface CartStoreType {
    items: CartItem[];
    addCartItem: (item: CartItem) => void;
    removeCartItem: (id: string) => void;
    updateQuantity: (id: string, operation: string, quantity?: number) => void;
}

// Initial state for the cart store
const initialState: CartStoreType = {
    items: localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart')!) : [],
    addCartItem: () => { },
    removeCartItem: () => { },
    updateQuantity: () => { },
};

// Create the cart store with persistence
const useCartStore = create<CartStoreType>()(
    persist(
        (set) => ({
            ...initialState,
            addCartItem: (item) => set((state) => ({ items: [...state.items, item] })),
            removeCartItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

            updateQuantity: (id, operation, quantity) => {
                if (operation === CartItemQuantityOperation.ADD) {
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    }));
                } else if (operation === CartItemQuantityOperation.SUBTRACT) {
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    }));
                } else if (operation === CartItemQuantityOperation.SET && quantity) {
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity } : item
                        ),
                    }));
                }
            },
        }),
        {
            name: 'cart-items',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;