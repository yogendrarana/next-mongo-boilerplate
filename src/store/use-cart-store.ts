import { create } from 'zustand';
import { CartItemQuantityOperation } from '@/constants/enum';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};

interface CartStoreType {
    items: CartItem[];
    addCartItem: (item: CartItem) => void;
    removeCartItem: (id: string) => void;
    updateQuantity: (id: string, operation: string, quantity?: number) => void;
}

const useCartStore = create<CartStoreType>()(
    persist(
        (set) => ({
            items: [],
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