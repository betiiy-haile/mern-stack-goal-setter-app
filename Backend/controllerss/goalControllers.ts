import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import GoalModel from "../models/goalModel"

/*
    @desc - Get all goals
    @route - GET /api/goals
    @access - Private

*/
export const getGoals = asyncHandler(async (req: Request, res: Response) => {

    const goals = await GoalModel.find()

    res.status(200).json(goals)
})

/*
    @desc - Get single goal
    @route - GET /api/goals/:id
    @access - Private

*/
export const getGoal = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: `Get goal ${req.params.id}` })
})

/*
    @desc - Set new Goal
    @route - POST /api/goals
    @access - Private

*/
export const setGoal = asyncHandler(async (req: Request, res: Response) => {
    if(!req.body.text){
        // return res.status(400).json({message: "Please include a goal"})
        res.status(400)
        throw new Error("Please include a goal")   // this return an error html page to show u the details of the error.
    }
    const goal = await GoalModel.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})

/*
    @desc - Update Goal
    @route - PUT /api/goals/:id
    @access - Private

*/
export const updateGoal = asyncHandler(async (req: Request, res: Response) => {

    const goal = await GoalModel.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    const updatedGoal = await GoalModel.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.status(200).json(updatedGoal)
})

/*
    @desc - Delete Goal
    @route - DELETE /api/goals/:id
    @access - Private

*/
export const deleteGoal = asyncHandler(async (req: Request, res: Response) => {

    const goal = await GoalModel.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    await GoalModel.deleteOne({ _id: req.params.id });

    res.json({ id: req.params.id})
})