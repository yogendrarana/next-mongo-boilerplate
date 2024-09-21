import { MixIcon, SquareIcon } from "@radix-ui/react-icons"

export type DataTableConfig = typeof dataTableConfig

export const dataTableConfig = {
  comparisonOperators: [
    { label: "Equals", value: "$eq" as const },
    { label: "Not equals", value: "$ne" as const },
    { label: "Contains", value: "$regex" as const },
    { label: "Does not contain", value: "$not" as const },
    { label: "Starts with", value: "$regex" as const },
    { label: "Ends with", value: "$regex" as const },
    { label: "Greater than", value: "$gt" as const },
    { label: "Less than", value: "$lt" as const },
    { label: "Greater than or equal", value: "$gte" as const },
    { label: "Less than or equal", value: "$lte" as const },
    { label: "Is empty", value: "$exists" as const },
    { label: "Is not empty", value: "$exists" as const },
  ],
  selectableOperators: [
    { label: "Is", value: "$eq" as const },
    { label: "Is not", value: "$ne" as const },
    { label: "Is empty", value: "$exists" as const },
    { label: "Is not empty", value: "$exists" as const },
  ],
  logicalOperators: [
    { label: "And", value: "$and" as const, description: "All conditions must be met", },
    { label: "Or", value: "$or" as const, description: "At least one condition must be met", },
  ],
  featureFlags: [
    {
      label: "Advanced filter",
      value: "advancedFilter" as const,
      icon: MixIcon,
      tooltipTitle: "Toggle advanced filter",
      tooltipDescription: "A notion like query builder to filter documents.",
    },
    {
      label: "Floating bar",
      value: "floatingBar" as const,
      icon: SquareIcon,
      tooltipTitle: "Toggle floating bar",
      tooltipDescription: "A floating bar that sticks to the top of the table.",
    },
  ],
}