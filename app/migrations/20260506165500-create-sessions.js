export const up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TABLE sessions (
            sid VARCHAR(255) PRIMARY KEY,
            sess JSON NOT NULL,
            expire TIMESTAMP NOT NULL
        );
    `);
};

export const down = async ({ context: sequelize }) => {
    await sequelize.query(`DROP TABLE IF EXISTS sessions;`);
};