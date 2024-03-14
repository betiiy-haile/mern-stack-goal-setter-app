import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

interface User {
    name: string
    email: string
    password: string
}

interface LoginData {
    email: string
    password: string

}

const register = async (userData: User) => {
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData: LoginData) => {
    const response = await axios.post(API_URL + 'login', userData)
    console.log("response fron backend" , response.data)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        // localStorage.setItem('user', JSON.stringify(response.data.user.token))
        // console.log(localStorage.getItem('user'))
    }
    return response.data
}

const logout = async () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    login,
    logout
}

export default authService