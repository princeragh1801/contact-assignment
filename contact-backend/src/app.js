import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"
const app = express();

app.use(cors({
    origin : '*',
    credentials : true,
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({
    limit : "16kb",
    extended : true
}))

app.use(cookieParser())


app.get("/", (req, res)=>{
    res.send("Hello from server")
})

// routes
import contactRoute from "./routes/user.route.js"
app.use("/api/contacts", contactRoute)
export {app}