class Application {
  constructor({ server, database, logger }) {
    this.server = server
    this.database = database
    this.logger = logger
  }

  async start() {
    if (this.database) {
      await this.database
        .authenticate()
        .then(() =>
          this.logger.info(
            `Connected to PG at   : ${this.database.config.host}`
          )
        )
        .catch(err => {
          this.logger.info(`Unable to connect to the database: ${err}`)
        })
    }
    await this.server.start()
  }

  async stop() {
    await this.server.stop()
  }
}

export default Application
