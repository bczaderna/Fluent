const Sequelize = require('sequelize');
const db = require("../db");

const Records = db.define('records', {
    text: {
        type: Sequelize.TEXT
    }
})