import React from "react";
import { formatMongoData } from "@/helpers";
import { getOrders } from "../_lib/queries";
import { OrderTable } from "./table/order-table";

interface OrdersComponentProps {
    getOrdersPromise: ReturnType<typeof getOrders>;
}

const OrdersComponent = ({ getOrdersPromise }: OrdersComponentProps) => {
    const {
        data: { orders, pageCount }
    } = React.use(getOrdersPromise);

    return <OrderTable tableData={formatMongoData(orders)} pageCount={pageCount} />;
};

export default OrdersComponent;
