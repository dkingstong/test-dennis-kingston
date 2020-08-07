module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('document', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
      },
      document_id: {
        allowNull: false,
        type: Sequelize.STRING,
        required: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      category: {
        type: Sequelize.ENUM,
        values: ['economics', 'political', 'social'],
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('document');
  },
};
