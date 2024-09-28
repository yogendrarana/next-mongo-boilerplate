import bcrypt from "bcrypt";
import mongoose, { Date, Document, Schema } from "mongoose";
import { AuthProviderEnum, UserRoleEnum } from "@/constants/enum";

export interface ICustomerBase {
    name?: string;
    email: string;
    password?: string;
    phone?: string;

    // for social login
    providerAccountId?: string;
    authProvider?: AuthProviderEnum;
    role?: UserRoleEnum;

    // for orders
    city?: string;
    state?: string;
    zip?: string;
    address?: string;
    country?: string;
}

// Interface extending Mongoose Document for use with the model
export interface ICustomer extends ICustomerBase {
    _id: string;
    createdAt: Date;
    updagerAt: Date;
    isValidPassword(password: string): Promise<boolean>;
}
export interface ICustomerDocument extends ICustomerBase, Document {}

const CustomerSchema: Schema = new Schema(
    {
        name: {
            type: Schema.Types.String
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        password: {
            type: Schema.Types.String
        },
        phone: {
            type: Schema.Types.String
        },
        authProvider: {
            type: Schema.Types.String,
            required: true,
            enum: AuthProviderEnum
        },
        providerAccountId: {
            type: Schema.Types.String
        },
        role: {
            type: Schema.Types.String,
            required: true,
            enum: Object.values(UserRoleEnum),
            default: UserRoleEnum.USER
        },

        city: {
            type: Schema.Types.String
        },
        state: {
            type: Schema.Types.String
        },
        zip: {
            type: Schema.Types.String
        },
        address: {
            type: Schema.Types.String
        },
        country: {
            type: Schema.Types.String
        }
    },
    {
        timestamps: true
    }
);

// static methods
CustomerSchema.methods.isValidPassword = async function (password: string) {
    return this.password ? await bcrypt.compare(password, this.password) : false;
};

// export model
const CustomerModel =
    mongoose.models?.Customer || mongoose.model<ICustomerDocument>("Customer", CustomerSchema);
export default CustomerModel;
