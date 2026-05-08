import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
        underscored: true,
        timestamps: true,
        freezeTableName: true
    }
});

export default sequelize;