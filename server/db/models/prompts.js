const Sequelize = require('sequelize');
const db = require("../db");

const Prompts = db.define('prompts', {
    text: {
        type: Sequelize.TEXT
    }
})