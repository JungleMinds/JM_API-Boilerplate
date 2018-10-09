class Application {
  constructor({ server }) {
    this.server = server
  }

  async start() {
    await this.server.start()
  }

  async stop() {
    await this.server.stop()
  }
}

export default Application
