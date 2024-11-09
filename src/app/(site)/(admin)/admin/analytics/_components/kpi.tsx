import React from "react";

interface KpiProps {
    title: string;
    value: string;
    icon: any;
}

export default function Kpi({ title, value, icon }: KpiProps) {
    return (
        <div className="h-36 p-3 border rounded-md flex flex-col justify-center items-center gap-2">
            <div className="">{icon}</div>
            <p className="text-center text-2xl font-bold">{value}</p>
            <p className="tex-center font-normal text-muted-foreground">{title}</p>
        </div>
    );
}
