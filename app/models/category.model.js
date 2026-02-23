import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class Category extends Model { };

Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    },
    {
        sequelize,
        modelName: "Category",
        tableName: "categories"
    }
)

export default Category;
