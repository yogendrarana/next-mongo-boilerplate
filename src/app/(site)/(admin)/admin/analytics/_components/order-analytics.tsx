"use client"

import { ArrowRight, ArrowUp, Banknote, Ellipsis, TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "A line chart"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface OrderAnalyticsProps {
    className?: string
}

export default function OrderAnalytics({
    className
}: OrderAnalyticsProps) {
    return (
        <Card className={cn("flex flex-col justify-between space-y-4 overflow-hidden", className)}>
            <CardHeader>
                <div className="flex justify-between font-medium">
                    Order
                    <Ellipsis className="h-4 w-4" />
                </div>
                <div className="text-sm text-muted-foreground flex justify-between">
                    Rs 12000

                    <div className="flex gap-2 items-center text-green-500">
                        <ArrowUp className="h-4 w-4" /> 10%
                    </div>
                </div>
            </CardHeader>
            <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
            <CardFooter className="flex-col py-0 items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Orders went up by 10% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total sales for this month
                </div>
            </CardFooter>

            <div className="w-full px-6 py-4 text-sm flex justify-between items-center bg-slate-50 ">
                View Report
                <ArrowRight className="h-4 w-4" />
            </div>
        </Card>
    )
}
