import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    name: String, 
    email: String,
    password: String
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    }, 
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    }
    }, {
        timestamps: true
    }
)

const userModel = mongoose.model<IUser>("User", userSchema)

export default userModel