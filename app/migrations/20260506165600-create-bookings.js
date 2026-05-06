export const up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TABLE bookings (
            id SERIAL PRIMARY KEY,
            date TIMESTAMP NOT NULL,
            nombre_de_personne INTEGER NOT NULL,
            prix_total INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL
        );
    `);
};

export const down = async ({ context: sequelize }) => {
    await sequelize.query(`DROP TABLE IF EXISTS bookings;`);
};