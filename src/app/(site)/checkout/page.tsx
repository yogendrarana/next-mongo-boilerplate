import React from "react";
import Checkout from "./_components/checkout";
import { Shell } from "@/components/shell";
import { SiteHeader } from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

const CheckoutPage = () => {
    return (
        <div className="flex flex-col gap-4 md:gap-10">
            <SiteHeader />
            <Shell>
                <Checkout />
            </Shell>
            <SiteFooter />
        </div>
    );
};

export default CheckoutPage;
