"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CartItemQuantityOperation } from "@/constants/enum"
import useCartStore, { TCartItem } from "@/store/use-cart-store"
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"

interface UpdateCartProps {
    cartLineItem: TCartItem
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
    const id = cartLineItem.id
    const { updateQuantity, removeFromCart } = useCartStore()

    return (
        <div className="flex w-full items-center justify-between space-x-2 xs:w-auto xs:justify-normal">
            <div className="flex items-center">
                <Button
                    id={`${id}-decrement`}
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-r-none"
                    onClick={() => {
                        updateQuantity((id), CartItemQuantityOperation.SUBTRACT)
                    }}
                >
                    <MinusIcon className="size-3" aria-hidden="true" />
                    <span className="sr-only">Remove one item</span>
                </Button>
                <Input
                    type="text"
                    value={cartLineItem.quantity}
                    id={`${id}-quantity`}
                    className="h-8 w-10 text-center rounded-none border-x-0"
                    disabled
                />
                <Button
                    id={`${id}-increment`}
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-l-none"
                    onClick={() => {
                        updateQuantity(id, CartItemQuantityOperation.ADD)
                    }}
                >
                    <PlusIcon className="size-3" aria-hidden="true" />
                    <span className="sr-only">Add one item</span>
                </Button>
            </div>
            <Button
                id={`${id}-delete`}
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => {

                    removeFromCart(id)
                }}
            >
                <TrashIcon className="size-3" aria-hidden="true" />
                <span className="sr-only">Delete item</span>
            </Button>
        </div>
    )
}
