import sequelize from "../config/sequelize-client.js";
import Category from "./category.model.js";
import Activity from "./activity.model.js";
import User from "./user.model.js";
import Booking from "./booking.model.js";
import Role from "./role.model.js";
import Tarif from "./tarif.model.js";
import Session from "./session.model.js";

Category.hasMany(Activity, {
    foreignKey: 'categoryId',
    as: 'activities'
});

Activity.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users'
});

User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
})

User.hasMany(Booking, {
    foreignKey: 'userId',
    as: 'bookings'
});

Booking.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

export { sequelize, Category, Activity, User, Booking, Role, Tarif, Session };