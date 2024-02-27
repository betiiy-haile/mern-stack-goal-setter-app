import express, { Request, Response} from "express"
import dotenv from "dotenv"
import connectDB from "./config/db"
import goalRouter from "./Routes/goalRoutes"
import userRouter from "./Routes/userRoutes"
dotenv.config()

connectDB()


const app = express()
const PORT = process.env.PORT || 5000

// body parser middle ware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))