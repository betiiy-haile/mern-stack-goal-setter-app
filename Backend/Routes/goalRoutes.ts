import express from "express"
import { deleteGoal, getGoal, getGoals, setGoal, updateGoal } from "../controllerss/goalControllers"
import protectRoute from "../middleware/AuthMiddleware"

const goalRouter = express.Router()


// All of our goal routes should be protected
goalRouter.get('/',protectRoute, getGoals)
goalRouter.get("/:id", protectRoute,  getGoal)
goalRouter.post('/' , protectRoute, setGoal)
goalRouter.put("/:id", protectRoute, updateGoal)
goalRouter.delete("/:id" ,protectRoute, deleteGoal)

// we can also do like this
// goalRouter.route('/').get(protectRoute, getGoals).post(protectRoute, setGoal)
// goalRouter.route('/:id).get(protectRoute, getGoal).put(protectRoute, updateGoal).delete(protectRoute, deleteGoal)

export default goalRouter