import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class Tarif extends Model { };

Tarif.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type:DataTypes.INTEGER,
            allowNull: false
        } 
    },
    {
        sequelize,
        modelName: "Tarif",
        tableName: "tarifs"
    }
)

export default Tarif;