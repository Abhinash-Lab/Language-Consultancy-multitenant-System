import express from "express"
const app = express();
import authRoute from "./route/auth/authRoute"


app.use(express.json())
app.use("/api",authRoute)


export default app;