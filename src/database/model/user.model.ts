import {
    Schema, model
} from "mongoose";

import { IUser } from '../../types/database/user'




const userSchema = new Schema<IUser>({
    Fname: { type: String },
    Lname: { type: String },
    email: { type: String },
    password: { type: String, select: false },
    mobile: { type: String },
});




export const user = model<IUser>('user', userSchema);
