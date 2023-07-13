import express, { Express } from "express";
import userRouter from "./router"

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRouter);

app.listen(port, () => {
    console.log("Server listening on port:", port);
});