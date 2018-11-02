export default {
  web: {
    port: 4050,
    security: {
      headers: {
        contentSecurityPolicy: false,
        dnsPrefetchControl: false,
        expectCt: false,
        featurePolicy: false,
        frameguard: false,
        hidePoweredBy: true,
        hpkp: false,
        hsts: false,
        ieNoOpen: false,
        noCache: false,
        noSniff: false,
        permittedCrossDomainPolicies: false,
        referrerPolicy: false,
        xssFilter: false
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
