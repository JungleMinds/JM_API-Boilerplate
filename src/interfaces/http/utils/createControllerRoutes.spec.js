import createControllerRoutes from './createControllerRoutes'

describe('interfaces/http/utils/createControllerRoutes', () => {
  it('should create routes (for user)', () => {
    const routes = createControllerRoutes('user')
    expect(typeof routes).toBe('function')
  })

  it(`should throw an error on a non-existing controller`, () => {
    expect(() => {
      createControllerRoutes('foo')
    }).toThrow(`Can't find a controller for 'foo'`)
  })
})
