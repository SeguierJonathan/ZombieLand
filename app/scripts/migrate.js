import migrator from "../config/umzug.migrations.js";

await migrator.up();
console.log("Migrations terminées !");