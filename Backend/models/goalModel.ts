import mongoose, { Document, Schema} from "mongoose";

interface IGoal extends Document {
    user: Schema.Types.ObjectId,
    text: string
}

const goalSchema: Schema<IGoal> = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "Please add a text value"]
    }
},{
    timestamps: true
})

const GoalModel = mongoose.model<IGoal>("Goal", goalSchema)

export default GoalModel