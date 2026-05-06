import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class Activity extends Model { }

Activity.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Taille minimale en centimètres
        minHeightCm: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        horrorLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Durée en secondes
        durationSeconds: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Activity",
        tableName: "activities"
    }
);

export default Activity;


