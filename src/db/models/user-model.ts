import bcrypt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";

// auth provider enum
export enum AuthProviderEnum {
    credentials = 'credentials',
    google = 'google'
}

// user schema 
export interface IUserModel extends Document {
    name: string;
    email: string;
    password: string;
    authProvider?: AuthProviderEnum;
    isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema<IUserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    authProvider: { type: String, required: true, enum: AuthProviderEnum }
})

// pre save hook to hash password
userSchema.pre<IUserModel>('save', async function (next) {
    if (!this.isModified('password')) next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err: any) {
        next(err);
    }
})

// methods
userSchema.methods.isValidPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


// export model
export default mongoose.models.User || mongoose.model<IUserModel>('User', userSchema);