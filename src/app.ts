import express from "express"

const app = express()
app.use(express.json())

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

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})