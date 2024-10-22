import React from "react";

interface KpiProps {
  title: string;
  value: string;
  icon: any;
}

export default function Kpi({ title, value, icon }: KpiProps) {
  return (
    <div className="h-36 p-3 border rounded-md">
      <div className="h-full flex items-center justify-center gap-4">
        <div className="h-14 w-14 p-4 rounded-lg border shadow-sm">{icon}</div>
        <div className="h-full flex flex-col items-start justify-center">
          <span className="font-normal text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
    </div>
  )
}