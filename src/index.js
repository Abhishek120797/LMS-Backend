import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db/index.js";

import { app } from "./app.js";

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Error : ", error);
            process.exit(1);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log("Server started at port number : ", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log("Database connection error", err);
    });
