"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn, formatPrice } from "@/lib/utils";
import { IProduct } from "@/server/db/models/product-model";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import ProductActions from "./product-actions";
import { Star } from "lucide-react";

interface ProductDetailPropsType {
    product: IProduct;
    className?: string;
}

export default function ProductDetail({ product, className }: ProductDetailPropsType) {
    const [selectedColor, setSelectedColor] = useState("gray");
    const [selectedSize, setSelectedSize] = useState("9 x 12 inch");

    return (
        <div className={cn(className)}>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
            </div>

            <p className="text-3xl font-bold mb-6">
                {formatPrice(product.price, { currency: "NRS" })}
            </p>

            <Accordion type="single" collapsible className="w-full" defaultValue="description">
                <AccordionItem value="description" className="border-none">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                        {product.description ?? "No description is available for this product."}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Pick Color</h2>
                <div className="flex space-x-2">
                    {["gray", "olive", "brown"].map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-lg border-2 ${
                                selectedColor === color ? "border-black" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            aria-label={`Select ${color} color`}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Size</h2>
                <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-2"
                >
                    {[
                        "5 x 6 inch",
                        "6 x 8 inch",
                        "7 x 9 inch",
                        "8 x 11 inch",
                        "9 x 12 inch",
                        "10 x 15 inch"
                    ].map((size) => (
                        <div key={size}>
                            <RadioGroupItem value={size} id={size} className="peer sr-only" />
                            <Label
                                htmlFor={size}
                                className="flex items-center justify-center px-3 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:ring-2"
                            >
                                {size}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <ProductActions product={product} />
        </div>
    );
}
