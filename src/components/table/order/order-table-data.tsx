import { Sparkles, Watch, Cross, Check } from "lucide-react";

export const OrderStatusData = [
    {
        label: "Pending",
        value: "pending",
        icon: Watch,
    },
    {
        label: "Processing",
        value: "processing",
        icon: Sparkles,
    },
    {
        label: "Failed",
        value: "failed",
        icon: Cross,
    },
    {
        label: "Success",
        value: "success",
        icon: Check
    }
]