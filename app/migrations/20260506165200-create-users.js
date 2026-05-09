export const up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            "first_name" VARCHAR(255) NOT NULL,
            "last_name" VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role_id INTEGER REFERENCES roles(id),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL
        );
    `);
};

export const down = async ({ context: sequelize }) => {
    await sequelize.query(`DROP TABLE IF EXISTS users;`);
};