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
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      through: 'user_document',
      as: 'user',
      foreignKey: 'documentId',
    });
    Document.hasMany(models.VersionedDoc, {
      as: 'versioned_doc',
    });
  };
  return Document;
};
