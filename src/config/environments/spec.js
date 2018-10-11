const environments = ['development', 'production', 'test']

environments.forEach(environment => {
  describe(`config/environments/${environment}`, () => {
    const config = require(`./${environment}`).default

    it(`should output a valid Web config`, () => {
      expect(config).toHaveProperty('web')
      expect(config.web).toHaveProperty('port')
    })

    it(`should output a valid Logging config`, () => {
      expect(config).toHaveProperty('logging')

      expect(config.logging).toHaveProperty('appenders')
      Object.keys(config.logging.appenders).forEach(appender => {
        expect(config.logging.appenders[appender]).toHaveProperty('type')
        const validTypes = ['console']
        expect(validTypes).toContain(config.logging.appenders[appender].type)
      })

      expect(config.logging).toHaveProperty('categories')
      expect(config.logging.categories).toHaveProperty('default')

      Object.keys(config.logging.categories).forEach(category => {
        expect(config.logging.categories[category]).toHaveProperty('appenders')
        expect(config.logging.categories[category]).toHaveProperty('level')
        const validLevels = ['info']
        expect(validLevels).toContain(config.logging.categories[category].level)
      })
    })
  })
})
