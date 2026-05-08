export const up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TABLE roles (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL
        );
    `);
};

export const down = async ({ context: sequelize }) => {
    await sequelize.query(`DROP TABLE IF EXISTS roles;`);
};