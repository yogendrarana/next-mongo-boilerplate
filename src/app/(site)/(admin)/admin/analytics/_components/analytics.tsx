import React from "react";
import OrderAnalytics from "./order-analytics";
import RevenueAnalytics from "./revenue-analytics";
import { DateRangePicker } from "@/components/date-range-picker";
import PopularProducts from "./popular-products";
import CentralAnalytics from "./central-analytics";
import Kpi from "./kpi";
import { CustomerAnalytics } from "./customer-analytics";
import { ListOrdered, DollarSign, UsersRound } from "lucide-react";

const Analytics = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-medium">Analytics</h1>
                    <p className="text-gray-400 text-sm">
                        Thurs, 1 July 2024 - Thurs, 30 July 2024
                    </p>
                </div>

                <DateRangePicker />
            </div>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-4">
                <Kpi
                    title="All Time Revenue"
                    value="20000"
                    icon={<DollarSign className="h-5 w-5" />}
                />
                <Kpi
                    title="All Time Orders"
                    value="50000"
                    icon={<ListOrdered className="h-5 w-5" />}
                />
                <Kpi
                    title="All Time Customers"
                    value="100"
                    icon={<UsersRound className="h-5 w-5" />}
                />
                <Kpi
                    title="All Time Customers"
                    value="100"
                    icon={<UsersRound className="h-5 w-5" />}
                />
            </div>

            <CentralAnalytics />

            <div className="grid gap-3 grid-cols-1 md:grid-cols-4">
                <div>
                    <RevenueAnalytics />
                </div>
                <div>
                    <OrderAnalytics />
                </div>
                <div>
                    <CustomerAnalytics />
                </div>
            </div>

            <div className="row-span-2">
                <PopularProducts />
            </div>
        </div>
    );
};

export default Analytics;
