
import {
    IBase
} from './baseType'



export interface IUser extends IBase {
    Fname: String,
    Lname: String,
    email: String,
    password: String,
    mobile: String,
}