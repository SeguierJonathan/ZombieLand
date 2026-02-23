import { sequelize } from "../models/index.js";

await sequelize.sync({ force: true });
console.log("✅ All models were synchronized successfully");

await sequelize.close();