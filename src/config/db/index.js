import sequelize from "./db.js";
import associateModels from "../../models/associations.js";
import User from "../../models/User.model.js";

const connectDB = async () => {
    try {
        // console.log(sequelize);
        await sequelize.authenticate();
        console.log("Database Connection has been established successfully.");

        associateModels();
        console.log("Association done");

        await sequelize.sync({ alter: true });
        console.log("All model syncronized");

        await init();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
};

async function init() {
    try {
        let admin = await User.findOne({ where: { user_type: "admin" } });
        if (admin) {
            console.log("admin is already present");
            return;
        }
    } catch (error) {
        console.log("Error while finding the admin data : ", error);
    }

    try {
        const admin = await User.create({
            first_name: "Vicky",
            last_name: "Jaiswal",
            email: process.env.ADMIN_EMAIL,
            contact: process.env.ADMIN_CONTACT,
            password: process.env.ADMIN_PASSWORD,
            user_type: "admin",
            is_verified: true,
        });
        console.log("admin created ", admin);
    } catch (error) {
        console.log("Error while creating admin : ", error);
    }
}
export default connectDB;
