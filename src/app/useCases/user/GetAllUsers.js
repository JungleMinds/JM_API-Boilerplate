import EventStore from '../../EventStore'

import { SUCCESS, ERROR } from './types'

class GetAllUsers extends EventStore {
  constructor({ usersRepository }) {
    super()
    this.usersRepository = usersRepository
    this.outputs = {
      SUCCESS,
      ERROR
    }
  }

  async execute() {
    try {
      const users = await this.usersRepository.getAll({
        attributes: ['id', 'name']
      })

      this.emit(SUCCESS, users)
    } catch (error) {
      this.emit(ERROR, error)
    }
  }
}

export default GetAllUsers
