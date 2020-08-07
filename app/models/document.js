module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    'document',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      documentId: {
        allowNull: false,
        type: DataTypes.STRING,
        required: true,
        field: 'document_id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.ENUM,
        values: ['economics', 'political', 'social'],
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  Document.associate = function (models) {
    Document.belongsToMany(models.User, {
      through: 'UserDocument',
      as: 'user',
      foreignKey: 'documentId',
    });
  };
  return Document;
};
