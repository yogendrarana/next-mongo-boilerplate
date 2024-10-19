import { OrderStatusEnum } from "@/constants/enum";
import mongoose, { Date, Document, Schema } from "mongoose";
import { IProduct } from "./product-model";

export interface IOrderBase {
    orderId: string;
    customerId: string;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;

    deliveredOn?: Date;
    status: OrderStatusEnum;

    shippingInfo: {
        name: string;
        phone: number;
        email?: string;
        city: string;
        province: string;
        zipCode: string;
        address: string;
    };

    paymentInfo: {
        paymentMethod: string;
        status: string;
    };

    orderItems: Partial<IProduct>[];
}

// Interface extending Mongoose Document for use with the model
export interface IOrder extends IOrderBase {
    _id: string;
    createdAt: Date;
    updagerAt: Date;
}
export interface IOrderDocument extends IOrderBase, Document {}

const OrderSchema: Schema = new Schema(
    {
        orderId: { type: Schema.Types.String, required: true, unique: true },
        customerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        subtotal: { type: Schema.Types.Number, required: true, default: 0 },
        tax: { type: Schema.Types.Number, required: true, default: 0 },
        deliveryFee: { type: Schema.Types.Number, required: true, default: 0 },
        total: { type: Schema.Types.Number, required: true, default: 0 },

        deliveredOn: { type: Schema.Types.Date },
        status: {
            type: Schema.Types.String,
            required: true,
            enum: OrderStatusEnum,
            default: OrderStatusEnum.PENDING
        },

        shippingInfo: {
            name: { type: String, required: true },
            phone: { type: Number, required: true },
            email: { type: String },
            city: { type: String, required: true },
            province: { type: String, required: true },
            zipCode: { type: String, required: true },
            address: { type: String, required: true }
        },

        paymentInfo: {
            paymentMethod: { type: String, required: true },
            status: { type: String, required: true }
        },

        orderItems: []
    },
    {
        timestamps: true
    }
);

// export model
const OrderModel = mongoose.models?.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);
export default OrderModel;
