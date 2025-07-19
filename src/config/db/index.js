import sequelize from "./db.js";
import associateModels from "../../models/assosiations.js";

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connection has been established successfully.");

        associateModels();
        console.log("Association done")

        await sequelize.sync({ alter: true });
        console.log("All model syncronized");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default connectDB;
