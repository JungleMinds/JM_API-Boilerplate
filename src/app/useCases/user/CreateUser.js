import EventStore from '../../EventStore'
import User from '../../../domain/user'

class CreateUser extends EventStore {
  constructor({ usersRepository }) {
    super()
    this.usersRepository = usersRepository
    CreateUser.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])
  }

  async execute(userData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs

    const user = new User(userData)
    try {
      const newUser = await this.usersRepository.create(user)
      this.emit(SUCCESS, newUser)
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error)
      }

      this.emit(ERROR, error)
    }
  }
}

export default CreateUser
