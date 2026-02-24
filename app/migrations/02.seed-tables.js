import { Category, Activity } from "../models/index.js";


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

// Crée des activitées par défaut avec l'ID d'une catégorie
await Activity.bulkCreate([
    {
        name: "Zombie Run",
        image: "zombie-run.jpg",
        minHeightCM: 140,
        horrorLevel: 4,
        durationSeconds: 1200,
        categoryId: 3,
        description: "Une course poursuite dans un labyrinthe infesté de zombies. Survivrez-vous jusqu'à la sortie ?"
    },
    {
        name: "Maison Hantée",
        image: "maison-hantee.jpg",
        minHeightCM: 130,
        horrorLevel: 5,
        durationSeconds: 900,
        categoryId: 7,
        description: "Explorez une vieille maison abandonnée remplie de créatures terrifiantes et de surprises effrayantes."
    },
    {
        name: "Apocalypse Coaster",
        image: "apocalypse-coaster.jpg",
        minHeightCM: 150,
        horrorLevel: 3,
        durationSeconds: 300,
        categoryId: 1,
        description: "Des montagnes russes ultra rapides dans un décor post-apocalyptique rempli d'explosions et de zombies."
    },
    {
        name: "Zombie Shooting Arena",
        image: "shooting-arena.jpg",
        minHeightCM: 120,
        horrorLevel: 2,
        durationSeconds: 600,
        categoryId: 9,
        description: "Attrapez votre arme laser et éliminez un maximum de zombies dans cette arène interactive."
    },
    {
        name: "Le Tunnel des Ténèbres",
        image: "tunnel-tenebres.jpg",
        minHeightCM: 135,
        horrorLevel: 4,
        durationSeconds: 480,
        categoryId: 4,
        description: "Un parcours à pied dans l'obscurité totale où chaque bruit peut cacher une menace."
    },
    {
        name: "Zombie Escape Game",
        image: "escape-game.jpg",
        minHeightCM: 125,
        horrorLevel: 3,
        durationSeconds: 3600,
        categoryId: 6,
        description: "Résolvez des énigmes et coopérez pour vous échapper avant l'invasion zombie."
    },
    {
        name: "Train de l'Apocalypse",
        image: "train-apocalypse.jpg",
        minHeightCM: 110,
        horrorLevel: 2,
        durationSeconds: 420,
        categoryId: 2,
        description: "Un voyage en train à travers une ville détruite envahie par les morts-vivants."
    },
    {
        name: "La Forêt Infectée",
        image: "foret-infectee.jpg",
        minHeightCM: 140,
        horrorLevel: 5,
        durationSeconds: 1500,
        categoryId: 8,
        description: "Traversez une forêt brumeuse où des zombies surgissent de partout."
    },
    {
        name: "Tour de la Chute Mortelle",
        image: "chute-mortelle.jpg",
        minHeightCM: 145,
        horrorLevel: 3,
        durationSeconds: 180,
        categoryId: 5,
        description: "Une tour de chute libre avec une ambiance sinistre et des effets spéciaux effrayants."
    },
    {
        name: "Le Laboratoire Secret",
        image: "laboratoire-secret.jpg",
        minHeightCM: 130,
        horrorLevel: 4,
        durationSeconds: 900,
        categoryId: 1,
        description: "Découvrez l'origine du virus zombie dans un laboratoire abandonné rempli d'expériences ratées."
    }
]);