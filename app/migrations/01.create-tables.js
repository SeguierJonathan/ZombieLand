import { sequelize } from "../models/index.js";

// Crée les tables suivant les models.
await sequelize.sync({ force: true });
console.log("✅ All models were synchronized successfully");

await sequelize.close();