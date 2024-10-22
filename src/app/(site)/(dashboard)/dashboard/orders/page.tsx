import React from "react";
import { getOrders } from "./_lib/queries";
import { SearchParams } from "@/constants/types";
import OrdersComponent from "./_components/order-component";
import { searchOrdersParamsSchema } from "./_lib/validations";

export interface AdminOrderPageProps {
    searchParams: SearchParams;
}

const AdminOrderPage = ({ searchParams }: AdminOrderPageProps) => {
    const search = searchOrdersParamsSchema.parse(searchParams);
    const getOrdersPromise = getOrders(search);

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <OrdersComponent getOrdersPromise={getOrdersPromise} />
        </React.Suspense>
    );
};

export default AdminOrderPage;
