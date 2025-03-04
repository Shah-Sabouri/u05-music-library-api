const express = require("express");
const userRouter = require("./routes/songRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("User API is live!");
});

app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});