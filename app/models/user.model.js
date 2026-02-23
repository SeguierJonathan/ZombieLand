import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class User extends Model { };

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users"
    }
)

export default User;
