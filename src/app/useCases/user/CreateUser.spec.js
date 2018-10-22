import { CreateUser } from './index'

describe('create new user use case', () => {
  it('should emit SUCCESS when user created successful', async () => {
    const usersRepository = { create: jest.fn().mockResolvedValue('created') }
    const userData = { name: 'New User' }
    const userCreate = new CreateUser(usersRepository)

    await userCreate.on(userCreate.outputs.SUCCESS, response => {
      expect(response.name).toBe('New User')
    })
    userCreate.execute(userData)
  })

  it('should emit VALIDATION_ERROR when the user is not valid', async () => {
    const usersRepository = {
      create: jest.fn().mockRejectedValue(new Error('ValidationError'))
    }
    const userData = { name: 'New User' }
    const userCreate = new CreateUser(usersRepository)

    await userCreate.on(userCreate.outputs.VALIDATION_ERROR, response => {
      expect(response.message).toBe('ValidationError')
    })
    userCreate.execute(userData)
  })

  it('should emit ERROR when there is ERROR', async () => {
    const usersRepository = {
      create: jest.fn().mockRejectedValue(new Error('error'))
    }
    const userData = { name: 'New User' }
    const userCreate = new CreateUser(usersRepository)

    await userCreate.on(userCreate.outputs.VALIDATION_ERROR, response => {
      expect(response.message).toBe('ValidationError')
    })
    userCreate.execute(userData)
  })
})
