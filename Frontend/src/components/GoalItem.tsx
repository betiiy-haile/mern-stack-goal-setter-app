import { useDispatch } from "react-redux"
import { deleteGoal } from "../features/goals/goalSlice"
import { UnknownAction } from "@reduxjs/toolkit"

export const GoalItem = ({ goal }: any) => {

    const dispatch = useDispatch()

    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button onClick={() => dispatch(deleteGoal(goal._id) as unknown as UnknownAction)} className='close'>
                X
            </button>
        </div>
    )
}

export default GoalItem