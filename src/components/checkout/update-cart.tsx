"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { type CartLineItemSchema } from "@/lib/validations/cart"
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import useCartStore from "@/store/use-cart-store"
import { CartItemQuantityOperation } from "@/constants/enum"

interface UpdateCartProps {
    cartLineItem: Partial<CartLineItemSchema>
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
    const id = React.useId()
    const [isPending, startTransition] = React.useTransition()
    const { updateQuantity, removeCartItem } = useCartStore()

    return (
        <div className="flex w-full items-center justify-between space-x-2 xs:w-auto xs:justify-normal">
            <div className="flex items-center">
                <Button
                    id={`${id}-decrement`}
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-r-none"
                    onClick={() => {
                        startTransition(async () => {
                            updateQuantity((id), CartItemQuantityOperation.SUBTRACT)
                        })
                    }}
                    disabled={isPending}
                >
                    <MinusIcon className="size-3" aria-hidden="true" />
                    <span className="sr-only">Remove one item</span>
                </Button>
                <Input
                    id={`${id}-quantity`}
                    type="number"
                    min="0"
                    className="h-8 w-14 rounded-none border-x-0"
                    value={cartLineItem.quantity}
                    onChange={(e) => {
                        startTransition(async () => {
                            updateQuantity(id, CartItemQuantityOperation.SET)
                        })
                    }}
                    disabled={isPending}
                />
                <Button
                    id={`${id}-increment`}
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-l-none"
                    onClick={() => {
                        startTransition(async () => {
                            updateQuantity(id, CartItemQuantityOperation.ADD)
                        })
                    }}
                    disabled={isPending}
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
                    startTransition(async () => {
                        removeCartItem(id)
                    })
                }}
                disabled={isPending}
            >
                <TrashIcon className="size-3" aria-hidden="true" />
                <span className="sr-only">Delete item</span>
            </Button>
        </div>
    )
}
