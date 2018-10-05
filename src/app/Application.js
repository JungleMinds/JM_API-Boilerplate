class Application {
  constructor({ server }) {
    this.server = server
  }

  async start() {
    await this.server.start()
  }
}

export default Application
