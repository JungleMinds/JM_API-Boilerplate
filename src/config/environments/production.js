const PORT = process.env.PORT || 8000

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
  }
}
