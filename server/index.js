import express from 'express'
import cors from 'cors'
import DBconnect from './config/mongoDBConnect.js';
import userRouter from './router/userRouter.js';
import adminRouter from './router/adminRouter.js'
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express()
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        credentials: true,
    })
);
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))
DBconnect()
app.use('/',userRouter)
app.use('/admin',adminRouter)





app.listen(8888, () => console.log('port running at 8888'))