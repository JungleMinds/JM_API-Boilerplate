import container from './container'

describe('container', () => {
  it('should have registered the System dependencies', () => {
    expect(container.cradle).toHaveProperty('app')
    expect(container.cradle).toHaveProperty('server')

    expect(container.cradle).toHaveProperty('router')
    expect(container.cradle).toHaveProperty('logger')

    expect(container.cradle).toHaveProperty('config')
  })

  it('should have registered the Midleware dependencies', () => {
    expect(container.cradle).toHaveProperty('loggerMiddleware')
    expect(container.cradle).toHaveProperty('containerMiddleware')
    expect(container.cradle).toHaveProperty('errorHandler')
  })

  it('should have registered database dependencies', () => {
    expect(container.cradle).toHaveProperty('database')
    expect(container.cradle).toHaveProperty('UserModel')
  })
})
