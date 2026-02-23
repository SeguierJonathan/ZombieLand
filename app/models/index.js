import sequelize from "../config/sequelize-client.js";
import Category from "./category.model.js";
import Activity from "./Activity.model.js";
import User from "./user.model.js";
import Booking from "./booking.model.js"

Category.hasMany(Activity, {
    foreignKey: 'categoryId',
    as: 'activities'
});

Activity.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

User.hasMany(Booking, {
    foreignKey: 'userId',
    as: 'bookings'
});

Booking.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

export { sequelize, Category, Activity, User, Booking };

