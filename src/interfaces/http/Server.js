import express from 'express'
class Server {
  constructor({ config, router, logger }) {
    this.config = config
    this.logger = logger
    this.express = express()

    this.express.disable('x-powered-by')
    this.express.use(router)
  }

  start() {
    return new Promise(resolve => {
      const http = this.express.listen(this.config.web.port, () => {
        const { port } = http.address()
        this.logger.info(`
          __            __        _                __   __
           ||   | |\\ | / _\` |    |__  |\\/| | |\\ | |  \\ /__\`
        \\__/ \\__/ | \\| \\__> |___ |___ |  | | | \\| |__/ .__/
      
        by: Jungle Minds
        `)
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`)
        resolve()
      })
    })
  }
}

export default Server
