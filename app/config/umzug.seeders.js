import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "./sequelize-client.js";

const seeder = new Umzug({
    migrations: {
        glob: "seeders/*.js",
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
        modelName: "SequelizeData",
    }),
    logger: console,
});

export default seeder;