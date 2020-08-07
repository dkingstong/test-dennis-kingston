module.exports = (sequelize, DataTypes) => {
  const UserDocument = sequelize.define(
    'user_document',
    {
      userId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'user_id',
        references: {
          model: 'User',
          key: 'id',
        },
      },
      documentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'document_id',
        references: {
          model: 'Document',
          key: 'id',
        },
      },
      isOwner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_owner',
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );
  return UserDocument;
};
