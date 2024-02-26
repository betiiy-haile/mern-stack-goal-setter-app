import mongoose, { Schema, Document } from "mongoose";

interface IGoal extends Document {
    text: string;
}

const goalSchema: Schema<IGoal> = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add a text value"],
    },
}, {
    timestamps: true,
});

const GoalModel = mongoose.model<IGoal>("Goal", goalSchema);

export default GoalModel;