import migrator from "../config/umzug.migrations.js";
import seeder from "../config/umzug.seeders.js";

console.log("Reset DB...");

await seeder.down({ to: 0 });
console.log("Seeds supprimés");

await migrator.down({ to: 0 });
console.log("Migrations supprimées");

await migrator.up();
console.log("Migrations rejouées");

await seeder.up();
console.log("Seeds rejoués");

console.log("Reset terminé !");