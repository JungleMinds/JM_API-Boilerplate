import fs from 'fs'
import path from 'path'
import sequelize from 'sequelize'
import createConfig from '../../../config'
const basename = path.basename(module.filename)
const ENV = process.env.NODE_ENV

const db = {}

const config = createConfig(ENV).database
const ORM = new sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: sequelize.Op,
  pool: config.pool,
  logging: false
})

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = ORM.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.ORM = ORM
db.sequelize = sequelize

export default db
