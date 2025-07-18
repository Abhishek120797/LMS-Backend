import db_name from "../../constants.js";
import sequelize from "./db.js";

const connectDB = async () => {
    try {
        console.log(db_name);
        await sequelize.authenticate();
        console.log("Database Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default connectDB;
