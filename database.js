const { connect } = require('mongoose')
const { success, error } = require('consola')
const { APP_DB_USER, APP_DB_PASS, APP_DB_HOST, APP_DB_NAME } = process.env

class Database {
  constructor() {
    this._connect()
  }

  async _connect() {
    try {
      await connect(
        `mongodb+srv://${APP_DB_USER}:${APP_DB_PASS}${APP_DB_HOST}/${APP_DB_NAME}`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true
        }
      )

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
