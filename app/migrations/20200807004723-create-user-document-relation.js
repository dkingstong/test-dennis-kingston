module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_document', {
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      document_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'document',
          key: 'id',
        },
      },
      is_owner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_owner',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('user_document');
  },
};
