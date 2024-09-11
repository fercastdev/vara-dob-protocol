/* {
    "development": {
        "username": "dev",
        "password": "123456",
        "database": "innovaDB",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "dev",
        "password": "123456",
        "database": "innovaDB",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "dev",
        "password": "123456",
        "database": "innovaDB",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
} */

const { loadConfig } = require('./config')

loadConfig()

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSW,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    },
    stating: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSW,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSW,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    }
}