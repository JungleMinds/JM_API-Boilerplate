const PORT = process.env.PORT || 8000

export default {
  web: {
    port: PORT
  },
  logging: {
    appenders: {
      out: { type: 'console' }
    },
    categories: {
      default: { appenders: ['out'], level: 'info' }
    }
  }
}
