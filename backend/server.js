import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import { errorHandler, notFound } from "./middleware/errorHandler.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// db connection
connectDb();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.yse("/api/cart",cartRouter)

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Working",
        version: "1.0.0",
        endpoints: {
            food: "/api/food",
            images: "/images"
        }
    })
})

// Middleware de erro - deve ser o último
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`🚀 Server Started on http://localhost:${port}`)
})
