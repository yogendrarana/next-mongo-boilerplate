"use client"

import * as React from "react"
import { ArrowRight, ArrowUp, Ellipsis, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export const description = "A pie chart with stacked sections"

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const mobileData = [
  { month: "january", mobile: 80, fill: "var(--color-january)" },
  { month: "february", mobile: 200, fill: "var(--color-february)" },
  { month: "march", mobile: 120, fill: "var(--color-march)" },
  { month: "april", mobile: 190, fill: "var(--color-april)" },
  { month: "may", mobile: 130, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

interface CustomerAnalyticsProps {
  className?: string
}

export function CustomerAnalytics({ className }: CustomerAnalyticsProps) {
  return (
    <Card className={cn("flex flex-col justify-between space-y-4 overflow-hidden", className)}>
      <CardHeader>
        <div className="flex justify-between font-medium">
          Customer
          <Ellipsis className="h-4 w-4" />
        </div>
        <div className="text-sm text-muted-foreground flex justify-between">
          500

          <div className="flex gap-2 items-center text-green-500">
            <ArrowUp className="h-4 w-4" /> 10%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="visitors"
                  nameKey="month"
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    return chartConfig[
                      payload?.[0].dataKey as keyof typeof chartConfig
                    ].label
                  }}
                />
              }
            />
            <Pie data={desktopData} dataKey="desktop" outerRadius={60} />
            <Pie
              data={mobileData}
              dataKey="mobile"
              innerRadius={70}
              outerRadius={90}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col py-0 items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Customer number went up by 10% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total customers for this month
        </div>
      </CardFooter>

      <div className="w-full px-6 py-4 text-sm flex justify-between items-center bg-slate-50 ">
        View Report
        <ArrowRight className="h-4 w-4" />
      </div>
    </Card>
  )
}
