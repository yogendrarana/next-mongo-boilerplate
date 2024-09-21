"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "@/constants/types"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { getProducts } from "../_lib/queries"
import { useProductsTable } from "./products-table-provider"
import { getProductsTableColumns } from "./products-table-columns"
import { IProduct } from "@/server/db/models/product-model"
import { ProductsTableToolbarActions } from "./products-table-toolbar"


interface ProductsTableProps {
  getProductsPromise: ReturnType<typeof getProducts>
}

export function ProductsTable({ getProductsPromise }: ProductsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useProductsTable()

  const { data, pageCount = 1 } = React.use(getProductsPromise)

  const columns = React.useMemo(() => getProductsTableColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<IProduct>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter categories...",
    },
    // {
    //   label: "category",
    //   value: "category",
    //   options: tasks.status.enumValues.map((status) => ({
    //     label: status[0]?.toUpperCase() + status.slice(1),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     withCount: true,
    //   })),
    // },
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    filterFields,
    initialState: {
    //   sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.productId}-${index}`,
    /* */
  })

  return (
    <DataTable
      table={table}
    >

        <DataTableToolbar table={table} filterFields={filterFields}>
          <ProductsTableToolbarActions table={table} />
        </DataTableToolbar>
    </DataTable>
  )
}
