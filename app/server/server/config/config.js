'use strict'

const path = require('path')
const dotenv = require('dotenv')

console.log('load node process env', process.env.NODE_ENV);

const loadConfig = () => {
    if (process.env.NODE_ENV === 'prod') {
        dotenv.config({ path: path.join(__dirname, './.env-prod') })
    } else if (process.env.NODE_ENV === 'staging') {
        dotenv.config({ path: path.join(__dirname, './.env-staging') })
    } else {
        dotenv.config({ path: require('find-config')('.env') })
    }
    //console.log(`postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}

// const loadTetrisDB = () => {
//     if (process.env.NODE_ENV === 'prod') {
//         dotenv.config({ path: path.join(__dirname, './.env-prod') })
//     } else if (process.env.NODE_ENV === 'staging') {
//         dotenv.config({ path: path.join(__dirname, './.env-staging') })
//     } else {
//         dotenv.config({ path: require('find-config')('.env') })
//     }
//     console.log(`postgres://${process.env.DB_TETRIS_USER}:${process.env.DB_TETRIS_PASSW}@${process.env.DB_TETRIS_HOST}:${process.env.DB_TETRIS_PORT}/${process.env.DB_TETRIS_NAME}`);
// }

module.exports = {
    loadConfig,
    // loadTetrisDB
}