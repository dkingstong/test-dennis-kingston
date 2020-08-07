module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('versioned_doc', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
      },
      document_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'document',
          key: 'id',
        },
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
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('versioned_doc');
  },
};
