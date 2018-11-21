const PORT = process.env.PORT || 4050

export default {
  web: {
    port: PORT,
    security: {
      headers: {
        contentSecurityPolicy: false,
        dnsPrefetchControl: true,
        expectCt: false,
        featurePolicy: false,
        frameguard: true,
        hidePoweredBy: true,
        hpkp: false,
        hsts: true,
        ieNoOpen: true,
        noCache: false,
        noSniff: true,
        permittedCrossDomainPolicies: false,
        referrerPolicy: false,
        xssFilter: true
      }
    }
  },
  logging: {
    appenders: {
      out: { type: 'console' }
    },
    categories: {
      default: { appenders: ['out'], level: 'info' }
    }
  },
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000
    }
  }
}
