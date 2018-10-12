class UserRepository {
  constructor() {}

  async getAll() {
    return {
      users: [
        ['5700EA9D-8D4E-04EB-2BA4-AB73C817530C', 'Grant, Oren L.'],
        ['E3607CFA-1B12-470B-43D1-F80B55110C6F', 'Mckenzie, Zorita M.'],
        ['D948875D-DD2A-F189-C813-18C95E6570D4', 'Luna, Theodore H.'],
        ['ED6889B6-6F1F-00E7-C64C-533B88A1C4D1', 'Travis, Fuller B.'],
        ['55D61990-BE11-CF0A-6A17-8B42079FAEB8', 'Villarreal, Bruce T.']
      ]
    }
  }
}

export default UserRepository
