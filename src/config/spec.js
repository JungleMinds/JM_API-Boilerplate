import config from './index'

describe(`config`, () => {
  it(`should output a valid default development config`, () => {
    const testConfig = config()
    expect(testConfig).toHaveProperty('env', 'development')
    expect(testConfig).toHaveProperty('development', true)
    expect(testConfig).toHaveProperty('web')
    expect(testConfig).toHaveProperty('logging')
  })

  it(`should load a different environment config when provided`, () => {
    const testConfig = config('production')
    expect(testConfig).toHaveProperty('env', 'production')
    expect(testConfig).toHaveProperty('production', true)
    expect(testConfig).toHaveProperty('web')
    expect(testConfig).toHaveProperty('logging')
  })

  it(`should throw an error on a non-existing environment`, () => {
    expect(() => {
      config('foo')
    }).toThrow(`Can't find a config for the environment 'foo'`)
  })
})
