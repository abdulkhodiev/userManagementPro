const express = require("express");
const app = express();
const mongooose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const cors = require("cors");

dotenv.config();

mongooose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
app.use(express.json());

app.use(cors());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/api/user", authRoute);
app.use("/api/control", userRoute);

app.listen(3000, () => console.log("Server started on port 3000"));
