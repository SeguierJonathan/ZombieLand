import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "./sequelize-client.js";

const migrator = new Umzug({
    migrations: {
        glob: "migrations/*.js",
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

export default migrator;