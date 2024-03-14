import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import goalsReducer from "../features/goals/goalSlice"

// Define the RootState interface
interface RootState {
    auth: AuthState;
    goals: GoalsState;
}

// Define the AuthState interface
interface AuthState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    user: User | null;
}

// Define the GoalsState interface
interface GoalsState {
    goals: Goal[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
}


// Define the User interface
interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

// Define the Goal interface
interface Goal {
    createdAt: string;
    text: string;
    updatedAt: string;
    user: string;
    __v: number;
    _id: string;
}

// Create the Redux store using configureStore
const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalsReducer,
    },
});

export default store;
export type { RootState, AuthState, GoalsState, User, Goal };