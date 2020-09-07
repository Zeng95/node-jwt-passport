const { connect } = require('mongoose')
const { success, error } = require('consola')
const { APP_DB_USER, APP_DB_PASS, APP_DB_HOST, APP_DB_NAME } = process.env

const dbString = `mongodb+srv://${APP_DB_USER}:${APP_DB_PASS}${APP_DB_HOST}/${APP_DB_NAME}`
const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}

class Database {
  constructor() {
    this._connect()
  }

  async _connect() {
    try {
      await connect(dbString, dbOptions)

      success({
        message: 'Database connection successful',
        badge: true
      })
    } catch (err) {
      error({
        message: `Database connection error: ${err}`,
        badge: true
      })
    }
  }
}

module.exports = new Database()
