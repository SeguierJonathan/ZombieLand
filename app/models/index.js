import sequelize from "../config/sequelize-client.js";
import Category from "./category.model.js";
import Activity from "./Activity.model.js";

Category.hasMany(Activity, {
    foreignKey: 'categoryId',
    as: 'activities'
});

Activity.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});



export { sequelize, Category, Activity };