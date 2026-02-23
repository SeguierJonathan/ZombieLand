import { Category } from "../models/index.js";


// Crée des catégories par défaut
await Category.bulkCreate([
    { name: "Sensations fortes", description: "Montagnes russes et chutes libres pour les amateurs de sensations" },
    { name: "Expériences hantées", description: "Maisons hantées, labyrinthes et escape games effrayants" },
    { name: "Attractions familiales", description: "Manèges et activités adaptés à toute la famille" },
    { name: "Spectacles et animations", description: "Spectacles de zombies, parades et shows interactifs" },
    { name: "Jeux interactifs", description: "Laser tag, tirs sur cibles et expériences VR" },
    { name: "Attractions aquatiques", description: "Bateaux fantômes, rivières rapides et zones splash" },
    { name: "Restauration thématique", description: "Restaurants et bars immersifs dans l’univers zombie" },
    { name: "Boutiques et souvenirs", description: "Magasins de souvenirs et produits dérivés" },
    { name: "Événements spéciaux", description: "Halloween, festivals zombies et soirées nocturnes" }
]);