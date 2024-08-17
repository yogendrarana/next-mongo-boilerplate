import { ProductCard } from '@/components/product-card';
import { IProduct } from '@/server/db/models/product-model';
import { getProductsByCategory } from '@/server/queries/product';

interface TGetProductByCategory {
    category: string;
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function ProductList({ category, searchParams }: TGetProductByCategory) {
    const response = await getProductsByCategory(category, searchParams);

    return (
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {response.data && response.data.map((product: IProduct) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}