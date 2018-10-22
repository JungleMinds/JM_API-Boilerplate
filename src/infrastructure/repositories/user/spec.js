import UserRepository from './index'

describe('infrastructure/repositories/user', () => {
  const repo = new UserRepository()

  it('should "getAll" users', async () => {
    const userData = await repo.getAll()
    expect(userData).toHaveProperty('users')
    expect(Array.isArray(userData.users)).toBe(true)
    expect(userData.users.length > 0).toBe(true)
  })

  it('should "create" a user and add it to the db', async () => {
    const userDataWithoutNewUser = await repo.getAll()
    const mockUser = {
      validate: () => ({ valid: true, errors: [] }),
      id: 'testID',
      name: 'testName'
    }
    const newUser = await repo.create(mockUser)
    const userDataWithNewUser = await repo.getAll()

    expect(newUser).toHaveProperty('id', mockUser.id)
    expect(newUser).toHaveProperty('name', mockUser.name)
    expect(
      userDataWithNewUser.users.length - userDataWithoutNewUser.users.length
    ).toBe(1)
    expect(
      userDataWithNewUser.users[userDataWithNewUser.users.length - 1]
    ).toBe(mockUser)
  })

  it('should handle errors on "create" user', async () => {
    const mockInvalidUser = {
      validate: () => ({ valid: false, errors: [new Error('Oops!')] }),
      id: 'testID',
      name: 'testName'
    }

    try {
      await repo.create(mockInvalidUser)
    } catch (err) {
      expect(err.message).toBe('ValidationError')
      expect(err.details.length).toBe(1)
      expect(err.details[0].message).toBe('Oops!')
    }
  })
})
