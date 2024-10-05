import { hash, compare } from "bcryptjs";
import mongoose, { Date, Document, Schema } from "mongoose";
import { AuthProviderEnum, UserRoleEnum } from "@/constants/enum";

export interface IUserBase {
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
export interface IUser extends IUserBase {
    _id: string;
    createdAt: Date;
    updagerAt: Date;
    isValidPassword(password: string): Promise<boolean>;
}
export interface IUserDocument extends IUserBase, Document {}

const UserSchema: Schema = new Schema(
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
            enum: AuthProviderEnum,
            default: AuthProviderEnum.CREDENTIALS
        },
        providerAccountId: {
            type: Schema.Types.String
        },
        role: {
            type: Schema.Types.String,
            required: true,
            enum: Object.values(UserRoleEnum),
            default: UserRoleEnum.CUSTOMER
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

// pre-save hook
UserSchema.pre<IUserDocument>("save", async function (next) {
    if (this.isModified("password")) {
        if (this.password) {
            const hashedPassword = await hash(this.password, 12);
            this.password = hashedPassword;
        }
    }
    next();
});

// static methods
UserSchema.methods.isValidPassword = async function (password: string) {
    return this.password ? await compare(password, this.password) : false;
};

// export model
const UserModel = mongoose.models?.User || mongoose.model<IUserDocument>("User", UserSchema);
export default UserModel;
