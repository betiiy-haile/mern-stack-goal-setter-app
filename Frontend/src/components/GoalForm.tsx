import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"
import { UnknownAction } from "@reduxjs/toolkit"

const GoalForm = () => {

  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (e: any) => {
    e.preventDefault()
    dispatch(createGoal(({text})) as unknown as UnknownAction)
    setText('')
  }
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
        
      </form>
    </section>
  )
}

export default GoalForm
