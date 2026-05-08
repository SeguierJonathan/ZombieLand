export const up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TABLE activities (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            image VARCHAR(255) NOT NULL,
            min_height_cm INTEGER NOT NULL,
            horror_level INTEGER NOT NULL,
            duration_seconds INTEGER NOT NULL,
            description TEXT NOT NULL,
            category_id INTEGER REFERENCES categories(id),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL
        );
    `);
};

export const down = async ({ context: sequelize }) => {
    await sequelize.query(`DROP TABLE IF EXISTS activities;`);
};