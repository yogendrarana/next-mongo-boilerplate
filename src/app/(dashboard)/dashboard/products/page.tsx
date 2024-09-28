import { SearchParams } from "@/constants/types";
import { ProductsTable } from "./_components/products-table";
import { searchProductsParamsSchema } from "./_lib/validations";
import { getProducts, getCategories, getSubcategories } from "./_lib/queries";

export interface ProductsPageProps {
    searchParams: SearchParams;
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
    const search = searchProductsParamsSchema.parse(searchParams);
    return (
        <ProductsTable
            getProductsPromise={getProducts(search)}
            getCategoriesPromise={getCategories()}
            getSubcategoriesPromise={getSubcategories()}
        />
    );
};

export default ProductsPage;
