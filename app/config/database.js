module.exports = {
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: `${process.env.DB_NAME}_test`,
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
    },
};
