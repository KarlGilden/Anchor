import express from 'express';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { store } from './data/db';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT;
const url = `${process.env.URL}:${port}`

app.use(cors({
  origin: url, // your frontend origin
  credentials: true,               // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === "production",
      maxAge: 30000, // 30 seconds for testing
    },
    store,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})