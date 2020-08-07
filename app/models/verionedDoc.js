module.exports = (sequelize, DataTypes) => {
  const VersionedDoc = sequelize.define(
    'versioned_doc',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      documentId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Document',
          key: 'id',
        },
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
  VersionedDoc.associate = function (models) {
    VersionedDoc.belongsTo(models.Document, {
      as: 'document',
      foreignKey: 'documentId',
    });
  };
  return VersionedDoc;
};
