module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );
  User.associate = function (models) {
    User.belongsToMany(models.Document, {
      through: 'user_document',
      as: 'document',
      foreignKey: 'userId',
    });
  };
  return User;
};
