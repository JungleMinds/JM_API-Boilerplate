import EventStore from '../../EventStore'

class GetAllUsers extends EventStore {
  constructor({ usersRepository }) {
    super()
    this.usersRepository = usersRepository
    GetAllUsers.setOutputs(['SUCCESS', 'ERROR'])
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs

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
