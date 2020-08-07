module.exports = (sequelize, DataTypes) => {
  const UserDocument = sequelize.define('user_document', {
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
  });
  return UserDocument;
};
