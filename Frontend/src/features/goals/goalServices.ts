import axios from 'axios'

const API_URL = 'http://localhost:5000/api/goals'


// create new goal
const createGoal = async (goalData: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    }

    const response = await axios.post(API_URL, goalData, config)  
    // console.log(response)  
    return  response.data
}

// get user goals
const getGoals = async (token: string) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    // console.log(response)
    return response.data
}


// delete goals
const deleteGoal = async (goalId: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + `/${goalId}`, config)
    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService