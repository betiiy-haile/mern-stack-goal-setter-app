import express from "express"
import { deleteGoal, getGoal, getGoals, setGoal, updateGoal } from "../controllerss/goalControllers"

const goalRouter = express.Router()

goalRouter.get('/', getGoals)
goalRouter.get("/:id", getGoal)
goalRouter.post('/' , setGoal)
goalRouter.put("/:id", updateGoal)
goalRouter.delete("/:id" , deleteGoal)

// we can also do like this
// goalRouter.get('/', getGoals).post('/', setGoal)
// goalRouter.get('/:id', getGoal).put('/;id', updateGoal).delete('/:id', deleteGoal)

export default goalRouter