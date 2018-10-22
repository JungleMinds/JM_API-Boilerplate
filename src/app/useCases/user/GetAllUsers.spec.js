import { GetAllUsers } from './index'

describe('get all users use case', () => {
  it('should emit SUCCESS with all the users when query successful', async () => {
    const userGetAll = new GetAllUsers({
      usersRepository: {
        getAll: jest.fn().mockResolvedValue({
          users: []
        })
      }
    })

    await userGetAll.on(userGetAll.outputs.SUCCESS, response => {
      expect(response).objectContaining({
        users: expect.any(Array)
      })
    })

    userGetAll.execute()
  })

  it('should emit ERROR when there is an error', async () => {
    const userGetAll = new GetAllUsers({
      usersRepository: { getAll: jest.fn().mockRejectedValue('Failed') }
    })

    await userGetAll.on(userGetAll.outputs.ERROR, response => {
      expect(response).toBe('Failed')
    })
    userGetAll.execute()
  })
})
