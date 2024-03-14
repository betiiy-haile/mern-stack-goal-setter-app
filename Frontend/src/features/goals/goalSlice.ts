import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalServices";
import { GoalsState, RootState, Goal } from "../../app/store";

const initialState: GoalsState = {
    goals: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};



// create new goal
export const createGoal = createAsyncThunk<
    string, // Return type of the payload creator
    { text: string }, // First argument to the payload creator
    {
        state: RootState; // Type of getState
    }
>(
    "goals/create",
    async (goalData, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState;

            const token = state.auth.user?.token;

            const response = await goalService.createGoal(goalData, token);
            return response;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkApi.rejectWithValue({ message });
        }
    }
);


// get  user goals
export const getGoals = createAsyncThunk("goals/getAll", async(_, thunkApi) => {
    try {
        const state = thunkApi.getState() as RootState;

        const token = state.auth.user?.token;

        const response = await goalService.getGoals(token as string);
        // return response.data;        // it should be only response since it is a list of goals
        return response
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue({ message });
    }
})


// DELETE GOAL
export const deleteGoal = createAsyncThunk(
    'goals/delete', async(goalId: string, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState;

            const token = state.auth.user?.token;
            const response = await goalService.deleteGoal(goalId, token as string);
            console.log("hello i am here", response)

            return response
            
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkApi.rejectWithValue({ message });
        }
    }
)


export const goalSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        reset: (state: GoalsState) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(state.goals, action.payload)
                state.goals.push(action.payload as any)            
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log("Hello from goal slice")
                state.goals = state.goals.filter((goal: Goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer