import React from "react";
import Checkout from "./_components/checkout";
import { SiteHeader } from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Container from "@/components/container";

const CheckoutPage = () => {
    return (
        <div className="flex flex-col gap-4 md:gap-10">
            <SiteHeader />
            <Container>
                <Checkout />
            </Container>
            <SiteFooter />
        </div>
    );
};

export default CheckoutPage;
