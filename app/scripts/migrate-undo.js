import migrator from "../config/umzug.migrations.js";

await migrator.down();
console.log("Dernière migration annulée !");