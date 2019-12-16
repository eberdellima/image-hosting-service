const Sequelize = require('sequelize')

const dbConfig = {
  database: process.env.DB,
  username: process.env.DB_HOST,
  password: process.env.DB_PASS,
}

const sequelize = new Sequelize(...dbConfig, {
  dialect: 'postgres'
})

const db = {
  Images: sequelize.import('./../src/models/Images')
}

module.exports = {
  db,
  sequelize,
  Sequelize
}