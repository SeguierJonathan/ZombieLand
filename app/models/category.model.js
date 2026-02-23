import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class Category extends Model { };

Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },
    {
        sequelize,
        modelName: "Category",
        tableName: "categories"
    }
)

export default Category;
