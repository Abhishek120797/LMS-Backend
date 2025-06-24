import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

app.on("error", (error) => {
    console.error("Error : ", error);
    process.exit(1);
});


app.listen(process.env.PORT || 8000, () => {
    console.log("Server started at port number : ", process.env.PORT);
    console.log(app)
});
