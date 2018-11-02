export default (sequelize, DataTypes) => {
  class UserModel extends sequelize.Model {}

  return UserModel.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'users'
    }
  )
}
