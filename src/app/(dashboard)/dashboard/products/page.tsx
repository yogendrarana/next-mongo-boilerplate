import { ProductsTable } from "./_components/products-table"
import { data } from "./_lib/data"
import { getProducts } from "./_lib/queries"

const ProductsPage = () => {

  return (
    <ProductsTable getProductsPromise={getProducts()} />
  )
}

export default ProductsPage