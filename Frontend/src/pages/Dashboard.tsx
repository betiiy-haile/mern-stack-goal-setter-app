import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoalItem from "../components/GoalItem"
import GoalForm from "../components/GoalForm"
import { RootState } from "../app/store"
import { getGoals, reset } from "../features/goals/goalSlice"
import { UnknownAction } from "@reduxjs/toolkit"
import Spinner from "../components/Spinner"

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => state.auth)
  const { isLoading , isError, goals, message} = useSelector((state: RootState) => state.goals)

  // restircting dashboard if the user is not logged in.
  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }
    
    console.log("useeffect dahboard")
    dispatch(getGoals() as unknown as UnknownAction)

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])


  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        { goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => <GoalItem goal={goal} key={goal._id} /> )}
          </div>
        ) : (<h3> You have not set any goal yet!!</h3>)}
      </section>
    </>
  )
}

export default Dashboard
