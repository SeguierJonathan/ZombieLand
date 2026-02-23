import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-client.js";

class Booking extends Model { };

Booking.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        nombre_de_personne: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prix_total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "Booking",
        tableName: "bookings"
    }
)

export default Booking;
