import User from './index'

describe('domain/user', () => {
  it('should return a proper structured user', () => {
    const mockUserData = { id: 'testid', name: 'testname' }
    const user = new User(mockUserData)
    expect(user).toHaveProperty('id', mockUserData.id)
    expect(user).toHaveProperty('name', mockUserData.name)

    expect(user).toHaveProperty('greet')
    expect(user.greet()).toBe(`Hello ${mockUserData.name}`)
  })
})
