import path from 'path'

export default {
  web: {
    port: 4050
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
