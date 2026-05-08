import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class Session extends Model { };

Session.init(
    {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        sess: {
            type: DataTypes.JSON,
            allowNull: false
        },
        expire: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "sessions"
    }
);

export default Session;