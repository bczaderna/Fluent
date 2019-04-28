const db = require('../db')

const User = require('./user')
const Prompts = require('./prompts')
const Records = require('./records')

// const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Records.belongsTo(User);
// User.hasMany(Records);



module.exports = {
  User,
  Records,
  Prompts,
  db
}
