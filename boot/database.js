const Sequelize = require('sequelize')

const dbConfig = [
  process.env.DB,
  process.env.DB_HOST,
  process.env.DB_PASS,
]

const sequelize = new Sequelize(...dbConfig, {
  dialect: 'postgres',
  logging: false
})

const db = {
  Images: sequelize['import']('./../src/models/Images')
}

module.exports = {
  db,
  sequelize,
  Sequelize
}