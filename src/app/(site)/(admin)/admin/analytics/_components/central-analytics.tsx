"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
    { date: "2024-04-01", revenue: 222, user: 150 },
    { date: "2024-04-02", revenue: 97, user: 180 },
    { date: "2024-04-03", revenue: 167, user: 120 },
    { date: "2024-04-04", revenue: 242, user: 260 },
    { date: "2024-04-05", revenue: 373, user: 290 },
    { date: "2024-04-06", revenue: 301, user: 340 },
    { date: "2024-04-07", revenue: 245, user: 180 },
    { date: "2024-04-08", revenue: 409, user: 320 },
    { date: "2024-04-09", revenue: 59, user: 110 },
    { date: "2024-04-10", revenue: 261, user: 190 },
    { date: "2024-04-11", revenue: 327, user: 350 },
    { date: "2024-04-12", revenue: 292, user: 210 },
    { date: "2024-04-13", revenue: 342, user: 380 },
    { date: "2024-04-14", revenue: 137, user: 220 },
    { date: "2024-04-15", revenue: 120, user: 170 },
    { date: "2024-04-16", revenue: 138, user: 190 },
    { date: "2024-04-17", revenue: 446, user: 360 },
    { date: "2024-04-18", revenue: 364, user: 410 },
    { date: "2024-04-19", revenue: 243, user: 180 },
    { date: "2024-04-20", revenue: 89, user: 150 },
    { date: "2024-04-21", revenue: 137, user: 200 },
    { date: "2024-04-22", revenue: 224, user: 170 },
    { date: "2024-04-23", revenue: 138, user: 230 },
    { date: "2024-04-24", revenue: 387, user: 290 },
    { date: "2024-04-25", revenue: 215, user: 250 },
    { date: "2024-04-26", revenue: 75, user: 130 },
    { date: "2024-04-27", revenue: 383, user: 420 },
    { date: "2024-04-28", revenue: 122, user: 180 },
    { date: "2024-04-29", revenue: 315, user: 240 },
    { date: "2024-04-30", revenue: 454, user: 380 },
    { date: "2024-05-01", revenue: 165, user: 220 },
    { date: "2024-05-02", revenue: 293, user: 310 },
    { date: "2024-05-03", revenue: 247, user: 190 },
    { date: "2024-05-04", revenue: 385, user: 420 },
    { date: "2024-05-05", revenue: 481, user: 390 },
    { date: "2024-05-06", revenue: 498, user: 520 },
    { date: "2024-05-07", revenue: 388, user: 300 },
    { date: "2024-05-08", revenue: 149, user: 210 },
    { date: "2024-05-09", revenue: 227, user: 180 },
    { date: "2024-05-10", revenue: 293, user: 330 },
    { date: "2024-05-11", revenue: 335, user: 270 },
    { date: "2024-05-12", revenue: 197, user: 240 },
    { date: "2024-05-13", revenue: 197, user: 160 },
    { date: "2024-05-14", revenue: 448, user: 490 },
    { date: "2024-05-15", revenue: 473, user: 380 },
    { date: "2024-05-16", revenue: 338, user: 400 },
    { date: "2024-05-17", revenue: 499, user: 420 },
    { date: "2024-05-18", revenue: 315, user: 350 },
    { date: "2024-05-19", revenue: 235, user: 180 },
    { date: "2024-05-20", revenue: 177, user: 230 },
    { date: "2024-05-21", revenue: 82, user: 140 },
    { date: "2024-05-22", revenue: 81, user: 120 },
    { date: "2024-05-23", revenue: 252, user: 290 },
    { date: "2024-05-24", revenue: 294, user: 220 },
    { date: "2024-05-25", revenue: 201, user: 250 },
    { date: "2024-05-26", revenue: 213, user: 170 },
    { date: "2024-05-27", revenue: 420, user: 460 },
    { date: "2024-05-28", revenue: 233, user: 190 },
    { date: "2024-05-29", revenue: 78, user: 130 },
    { date: "2024-05-30", revenue: 340, user: 280 },
    { date: "2024-05-31", revenue: 178, user: 230 },
    { date: "2024-06-01", revenue: 178, user: 200 },
    { date: "2024-06-02", revenue: 470, user: 410 },
    { date: "2024-06-03", revenue: 103, user: 160 },
    { date: "2024-06-04", revenue: 439, user: 380 },
    { date: "2024-06-05", revenue: 88, user: 140 },
    { date: "2024-06-06", revenue: 294, user: 250 },
    { date: "2024-06-07", revenue: 323, user: 370 },
    { date: "2024-06-08", revenue: 385, user: 320 },
    { date: "2024-06-09", revenue: 438, user: 480 },
    { date: "2024-06-10", revenue: 155, user: 200 },
    { date: "2024-06-11", revenue: 92, user: 150 },
    { date: "2024-06-12", revenue: 492, user: 420 },
    { date: "2024-06-13", revenue: 81, user: 130 },
    { date: "2024-06-14", revenue: 426, user: 380 },
    { date: "2024-06-15", revenue: 307, user: 350 },
    { date: "2024-06-16", revenue: 371, user: 310 },
    { date: "2024-06-17", revenue: 475, user: 520 },
    { date: "2024-06-18", revenue: 107, user: 170 },
    { date: "2024-06-19", revenue: 341, user: 290 },
    { date: "2024-06-20", revenue: 408, user: 450 },
    { date: "2024-06-21", revenue: 169, user: 210 },
    { date: "2024-06-22", revenue: 317, user: 270 },
    { date: "2024-06-23", revenue: 480, user: 530 },
    { date: "2024-06-24", revenue: 132, user: 180 },
    { date: "2024-06-25", revenue: 141, user: 190 },
    { date: "2024-06-26", revenue: 434, user: 380 },
    { date: "2024-06-27", revenue: 448, user: 490 },
    { date: "2024-06-28", revenue: 149, user: 200 },
    { date: "2024-06-29", revenue: 103, user: 160 },
    { date: "2024-06-30", revenue: 446, user: 400 }
];

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))"
    },
    user: {
        label: "User",
        color: "hsl(var(--chart-2))"
    }
} satisfies ChartConfig;

export default function CentralAnalytics() {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("revenue");

    const total = React.useMemo(
        () => ({
            revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
            user: chartData.reduce((acc, curr) => acc + curr.user, 0)
        }),
        []
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Bar Chart - Interactive</CardTitle>
                    <CardDescription>Showing total visitors for the last 3 months</CardDescription>
                </div>
                <div className="flex">
                    {["revenue", "user"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        });
                                    }}
                                />
                            }
                        />
                        
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
