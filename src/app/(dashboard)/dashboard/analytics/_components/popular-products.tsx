import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Ellipsis } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for top selling products
const topSellingProducts = [
    { id: 1, name: "Wireless Earbuds", price: 79.99, volumeSold: 1234, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Smart Watch", price: 199.99, volumeSold: 987, image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Laptop Stand", price: 39.99, volumeSold: 856, image: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Portable Charger", price: 29.99, volumeSold: 765, image: "/placeholder.svg?height=80&width=80" },
    { id: 5, name: "Wireless Mouse", price: 19.99, volumeSold: 654, image: "/placeholder.svg?height=80&width=80" },
]

interface PopularProductsProps {
    className?: string;
}

export default function PopularProducts({
    className
}: PopularProductsProps) {
    return (
        <Card className={cn("h-full flex flex-col justify-between overflow-hidden", className)}>
            <CardHeader className="">
                <p>Popular Products</p>
                <p className="text-muted-foreground">Top Selling products</p>
            </CardHeader>
            <CardContent className="p-3">
                <div className="space-y-3">
                    {topSellingProducts.map((product) => {
                        const totalPriceSold = product.price * product.volumeSold;
                        return (
                            <div key={product.id} className="border rounded-md overflow-hidden">
                                <div className="flex flex-col sm:flex-row items-center">
                                    <div className="flex-grow p-3 flex flex-col sm:flex-row sm:items-center justify-between w-full">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                ${product.price.toFixed(2)} per unit
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                                            <Badge variant="secondary" className="mb-1">
                                                {product.volumeSold.toLocaleString()} sold
                                            </Badge>
                                            <p className="text-sm font-medium">
                                                Total: ${totalPriceSold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}