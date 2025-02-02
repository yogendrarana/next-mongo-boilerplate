import { z } from "zod";
import { OrderStatus, PaymentMethod } from "..";
import { Icons } from "@/components/utils/icons";

// nav types
export interface NavItem {
    title: string;
    href?: string;
    active?: boolean;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;
export type SidebarNavItem = NavItemWithChildren;

// footer types
export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

// sidebar types
export interface SidebarItem {
    title: string;
    items: {
        title: string;
        href: string;
        icon?: keyof typeof Icons;
        external?: boolean;
    }[];
}

// product types
export interface SearchParams {
    [key: string]: string | string[] | undefined;
}

export type ProductSearchParams = {
    gte?: string;
    lte?: string;
    gender?: string;
    categorySlug?: string;
    subcategorySlug?: string;
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
    order?: string;
    [key: string]: string | string[] | undefined;
};

// order types
export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];
export type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];

// data table
export interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    withCount?: boolean;
}

export interface DataTableFilterField<TData> {
    label: string;
    value: keyof TData;
    placeholder?: string;
    options?: Option[];
}

export interface DataTableFilterOption<TData> {
    id: string;
    label: string;
    value: keyof TData;
    options: Option[];
    filterValues?: string[];
    filterOperator?: string;
    isMulti?: boolean;
}
