import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import GoalModel from "../models/goalModel"
import userModel from "../models/userModel"


interface CustomRequest extends Request {
    user?: any
}
/*
    @desc - Get all goals
    @route - GET /api/goals
    @access - Private

*/
export const getGoals = asyncHandler(async (req: CustomRequest, res: Response) => {

    const goals = await GoalModel.find({ user: req.user?._id })

    res.status(200).json(goals)
})

/*
    @desc - Get single goal
    @route - GET /api/goals/:id
    @access - Private

*/
export const getGoal = asyncHandler(async (req: CustomRequest, res: Response) => {
    const goal = await GoalModel.find({ _id: req.params.id, user: req.user?._id })
    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }
    res.status(200).json(goal)
})

/*
    @desc - Set new Goal
    @route - POST /api/goals
    @access - Private

*/

export const setGoal = asyncHandler(async (req: CustomRequest, res: Response) => {
    if(!req.body.text){
        // return res.status(400).json({message: "Please include a goal"})
        res.status(400)
        throw new Error("Please include a goal")   // this return an error html page to show u the details of the error.
    }
    const goal = await GoalModel.create({
        text: req.body.text,
        user: req.user?._id
    })

    res.status(200).json(goal)
})

/*
    @desc - Update Goal
    @route - PUT /api/goals/:id
    @access - Private

*/
export const updateGoal = asyncHandler(async (req: CustomRequest, res: Response) => {

    const goal = await GoalModel.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }


    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedGoal = await GoalModel.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedGoal)
})

/*
    @desc - Delete Goal
    @route - DELETE /api/goals/:id
    @access - Private

*/
export const deleteGoal = asyncHandler(async (req: CustomRequest, res: Response) => {

    const goal = await GoalModel.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // check for user
    if (!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }


    await GoalModel.deleteOne({ _id: req.params.id });

    res.json({ id: req.params.id}) 
})