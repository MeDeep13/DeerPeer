const express= require("express");
require("dotenv").config();
const app= express();
const cors= require("cors");
const connectDb= require("./config/dbConnection");
connectDb();
const port= process.env.PORT || 1974;


app.use(cors());
app.use(express.json()); // build-in json body parser middleware

app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(port, 'localhost',()=>{
    console.log(`Listening to port number: ${port}`);
});