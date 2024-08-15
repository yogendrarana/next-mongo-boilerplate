"use client"

import React from 'react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/use-cart-store';
import { Check, ShoppingCart } from 'lucide-react';
import { IProduct } from '@/server/db/models/product-model';

const ProductActions = ({ product }: { product: IProduct }) => {
    const { cartItems, addToCart, removeFromCart } = useCartStore();

    return (
        <div className='flex gap-4'>
            <Button
               variant="default"
               className='w-48 rounded-md bg-primary text-white'
            >
                Buy Now
            </Button>
            <Button
                variant="outline"
                className="w-48 p-2 rounded-md bg-white border"
                onClick={() => {
                    if (cartItems.find(item => item.id === product._id)) {
                        removeFromCart(product._id)
                        toast.error("Removed from cart.");
                    } else {
                        addToCart({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.images?.[0] ?? "/images/product-placeholder.webp",
                        })
                        toast.success("Added to cart.");
                    }
                }}
            >
                {
                    cartItems.find(item => item.id === product._id)
                        ? <div className='flex items-center gap-4'><Check size={14} /> Remove From Cart</div>
                        : <div className='flex items-center gap-4'><ShoppingCart size={14} /> Add To Cart</div>
                }
            </Button>
        </div>
    )
}

export default ProductActions