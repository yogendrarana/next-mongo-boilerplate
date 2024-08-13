"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import * as React from "react"
import Image from "next/image"
import { Icons } from "@/components/icons"
import { cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import { PlaceholderImage } from "@/components/placeholder-image"
import { CheckIcon, EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons"
import useCartStore from "@/store/use-cart-store"
import { IProduct } from "@/server/db/models/product-model"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Pick<IProduct, "id" | "name" | "price" | "images" | "inventory"> & {
        category: string | null
    }
    variant?: "default" | "switchable"
    isAddedToCart?: boolean
    onSwitch?: () => Promise<void>
}

export function ProductCard({
    product,
    variant = "default",
    isAddedToCart = false,
    onSwitch,
    className,
    ...props
}: ProductCardProps) {
    const { addCartItem } = useCartStore()
    const [isUpdatePending, startUpdateTransition] = React.useTransition()

    return (
        <Card
            className={cn("size-full overflow-hidden rounded-lg", className)}
            {...props}
        >
            <Link aria-label={product.name} href={`/product/${product.id}`}>
                <CardHeader className="border-b p-0">
                    <AspectRatio ratio={4 / 3}>
                        {product.images?.length ? (
                            <Image
                                src={
                                    product.images[0] ?? "/images/product-placeholder.webp"
                                }
                                alt={product.name ?? product.name}
                                className="object-cover"
                                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                                fill
                                loading="lazy"
                            />
                        ) : (
                            <PlaceholderImage className="rounded-none" asChild />
                        )}
                    </AspectRatio>
                </CardHeader>
                <span className="sr-only">{product.name}</span>
            </Link>
            <Link href={`/product/${product.id}`} tabIndex={-1}>
                <CardContent className="space-y-1.5 p-4">
                    <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-1">
                        {formatPrice(product.price)}
                    </CardDescription>
                </CardContent>
            </Link>
            <CardFooter className="p-4 pt-1">
                {variant === "default" ? (
                    <div className="flex w-full items-center space-x-2">
                        <Button
                            aria-label="Add to cart"
                            size="sm"
                            className="h-8 w-full rounded-sm"
                            onClick={async () => {
                                startUpdateTransition(() => { })

                                addCartItem({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    quantity: 1,
                                })
                            }}
                            disabled={isUpdatePending}
                        >
                            {isUpdatePending && (
                                <Icons.spinner
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            Add to cart
                        </Button>
                        <Link
                            href={`/preview/product/${product.id}`}
                            title="Preview"
                            className={cn(
                                buttonVariants({
                                    variant: "secondary",
                                    size: "icon",
                                    className: "h-8 w-8 shrink-0",
                                })
                            )}
                        >
                            <EyeOpenIcon className="size-4" aria-hidden="true" />
                            <span className="sr-only">Preview</span>
                        </Link>
                    </div>
                ) : (
                    <Button
                        aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
                        size="sm"
                        className="h-8 w-full rounded-sm"
                        onClick={async () => {
                            startUpdateTransition(async () => { })
                            await onSwitch?.()
                        }}
                        disabled={isUpdatePending}
                    >
                        {isUpdatePending ? (
                            <Icons.spinner
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        ) : isAddedToCart ? (
                            <CheckIcon className="mr-2 size-4" aria-hidden="true" />
                        ) : (
                            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                        )}
                        {isAddedToCart ? "Added" : "Add to cart"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
