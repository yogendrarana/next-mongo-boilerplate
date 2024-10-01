"use client"

import * as React from "react"

import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn, formatPrice } from "@/lib/utils"
import useCartStore from "@/store/use-cart-store"
import { motion, AnimatePresence } from "framer-motion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { IProduct } from "@/server/db/models/product-model"
import { Check, EyeIcon, Maximize2, ShoppingCart } from "lucide-react"
import { PlaceholderImage } from "@/components/utils/placeholder-image"
import { ProductPreview } from "../product/product-preview"

interface ProductCardProps {
    product: IProduct;
    className?: string;
}

export function ProductCard({
    product,
    className,
    ...props
}: ProductCardProps) {
    const {
        cartItems,
        addToCart,
        removeFromCart
    } = useCartStore()

    const router = useRouter()
    const [isHovered, setIsHovered] = React.useState(false);

    const containerVariants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    const firstButtonVariants = {
        hidden: { x: '100%', transition: { duration: 0.3 } },
        visible: { x: 0, transition: { duration: 0.3 } },
    };

    const secondButtonVariants = {
        hidden: { x: '100%', transition: { duration: 0.3, delay: 0.1 } },
        visible: { x: 0, transition: { duration: 0.3, delay: 0.1 } },
    };

    return (
        <Card
            {...props}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn("group", "size-full overflow-hidden relative rounded-lg", className)}
        >
            <Link
                aria-label={product.name}
                href={`/product/${product._id}`}
            >
                <CardHeader className="border-b p-0 overflow-hidden">
                    <AspectRatio ratio={5 / 4}>
                        {product.images?.length ? (
                            <Image
                                fill
                                loading="lazy"
                                src={product.images[0].url ?? "/images/product-placeholder.webp"}
                                alt={product.name ?? product.name}
                                className="object-cover group-hover:scale-[1.1] duration-500"
                                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                            />
                        ) : (
                            <PlaceholderImage className="rounded-none" asChild />
                        )}
                    </AspectRatio>
                </CardHeader>
                <span className="sr-only">{product.name}</span>
            </Link>

            {/* name and price */}
            <motion.div className="px-3 py-4 flex justify-between items-center">
                <div className="text-md">{product.name}</div>
                <div className="text-md font-semibold"> {formatPrice(product.price, { currency: "NRS" })} </div>
            </motion.div>

            {/* icons */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}
                        className="flex flex-col gap-2 absolute top-2 right-2"
                    >
                        <motion.button
                            variants={firstButtonVariants}
                            className="p-2 rounded-md bg-white border"
                            onClick={() => {
                                if (cartItems.find(item => item.id.toString() === product._id.toString())) {
                                    removeFromCart(product._id.toString())
                                    toast.error("Removed from cart.");
                                } else {
                                    addToCart({
                                        id: product._id.toString(),
                                        name: product.name,
                                        price: product.price,
                                        quantity: 1,
                                        image: product.images?.[0].url ?? "/images/product-placeholder.webp",
                                    })
                                    toast.success("Added to cart.");
                                }
                            }}
                        >
                            {
                                cartItems.find(item => item.id.toString() === product._id.toString())
                                    ? <Check size={14} />
                                    : <ShoppingCart size={14} />
                            }
                        </motion.button>

                        <motion.button
                            variants={secondButtonVariants}
                            className="p-2 rounded-md bg-white border"
                            onClick={() => router.push(`/product/${product._id}`)}
                        >
                            <EyeIcon size={14} />
                        </motion.button>

                        <ProductPreview product={product}>
                            <motion.button
                                variants={secondButtonVariants}
                                className="p-2 rounded-md bg-white border"
                            >
                                <Maximize2 size={14} />
                                <span className="sr-only">Preview</span>
                            </motion.button>
                        </ProductPreview>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}