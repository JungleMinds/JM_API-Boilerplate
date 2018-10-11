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
        noCache: true,
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
