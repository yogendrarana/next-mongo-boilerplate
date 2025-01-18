import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({ children, as: Comp = "div", className = "" }) => {
    const baseStyles = `container mx-auto px-6 sm:px-2 md:px-5 lg:px-6`;

    return <Comp className={cn(baseStyles, className)}>{children}</Comp>;
};

export default Container;
