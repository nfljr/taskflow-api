import express from "express"
import taskRoutes from "./routes/taskRoutes.js"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler.js"
import { logger } from "./middlewares/logger.js"

dotenv.config()
const app = express()
app.use(express.json())

app.use(logger)
app.use("/tasks", taskRoutes)

app.get("/health", (req, res) => {
    res.json({
        status : "ok",
    })
})

app.get("/about", (req, res) => {
    res.json({
        app : "TaskFlow",
        version : "1.0.0",
    })
})

app.get("/", (req, res)=> {
    res.json({
        message: "TaskFlow API Running",
    })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})