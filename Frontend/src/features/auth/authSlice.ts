import { createSlice , createAsyncThunk} from "@reduxjs/toolkit"


const user = JSON.parse(localStorage.getItem('user') as string)

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  // this functions are not asynchronous functions
        reset: (state) => {
            state.isError = false,
            state.isLoading = false,
            state.isSuccess = false,
            state.message = ''
        }
    },
    extraReducers: () => {}  // this functions are synchronous functions
})

export const { reset } = authSlice.actions
export default authSlice.reducer
