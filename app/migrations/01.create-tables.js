import { sequelize } from "../models/index.js";

// Crée les tables suivant les models.
await sequelize.sync({ force: true });

// crée la table pour save les sessions (force ecrase les tables existante)
await sequelize.query(`
CREATE TABLE "session" (
  "sid" varchar NOT NULL PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
`);

// crée la table que si elle n'existe pas pour save les sessions
/*
await sequelize.query(`
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
`);
*/


console.log("✅ All models were synchronized successfully");

await sequelize.close();