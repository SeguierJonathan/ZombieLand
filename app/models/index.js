import sequelize from "../config/sequelize-client.js";
import Category from "./category.model.js";
import Activity from "./Activity.model.js";
import User from "./user.model.js";
import Booking from "./booking.model.js";
import Role from "./role.js";
import Tarif from "./tarif.js";

Category.hasMany(Activity, {
    foreignKey: 'categoryId',
    as: 'activities'
});

Activity.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

Role.hasMany(User, {
    foreignKey: 'userId',
    as: 'users'
});

User.belongsTo(Role, {
    foreignKey: 'userId',
    as: 'user'
})

export { sequelize, Category, Activity, User, Booking, Role, Tarif };

