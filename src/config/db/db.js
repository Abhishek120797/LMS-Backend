import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import db_name from "../../constants.js";

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: db_name,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export default sequelize;
