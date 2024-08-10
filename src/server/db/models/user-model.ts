import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

// auth provider enum
export enum AuthProviderEnum {
    credentials = 'credentials',
    google = 'google'
}

// role enum
export enum UserRoleEnum {
    user = 'user',
    admin = 'admin'
}

// user schema 
export interface IUser extends Document {
    name?: string;
    email: string;
    password?: string;
    providerAccountId?: string;
    authProvider?: AuthProviderEnum;
    role?: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
    isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>({
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
    providerAccountId: {
        type: Schema.Types.String
    },
    authProvider: {
        type: Schema.Types.String,
        required: true,
        enum: AuthProviderEnum
    },
    role: {
        type: Schema.Types.String,
        required: true,
        enum: UserRoleEnum,
        default: UserRoleEnum.user
    },
}, {
    timestamps: true
})

// static methods
UserSchema.methods.isValidPassword = async function (password: string) {
    return this.password ? await bcrypt.compare(password, this.password) : false;
};


// export model
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default UserModel;