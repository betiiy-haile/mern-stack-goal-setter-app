import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

interface User {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const user = JSON.parse(localStorage.getItem('user') as string);

const initialState: AuthState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const register = createAsyncThunk('auth/register', async (userData: User, thunkApi) => {
    try {
        const response = await authService.register(userData);
        return response.data; // Assuming the response contains the registered user data
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue({ message });
    }
});


export const login = createAsyncThunk('auth/login', async (userData: LoginData, thunkApi) => {
    try {
        const response = await authService.login(userData);
        {/*
        return response.data; // Assuming the response contains the registered user data
         the above return doesn't work because if i return response.data the action.payload for the login fullfilled will be  undefined because by default it will try to find the data item from the response object. 
        so i have to return response instead of response.data  
    
        For example, if the API response is as follows:
        {
            data: {
                id: 123,
                name: "John Doe",
                email: "john@example.com"
            }
        }

        Then, action.payload in the login.fulfilled case will be:
        {
            id: 123,
            name: "John Doe",
            email: "john@example.com"
        }
    
    */}   
        return response
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue({ message });
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                // console.log("action payload", action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;