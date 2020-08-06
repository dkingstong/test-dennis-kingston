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
            ownerName: {
                type: DataTypes.STRING,
                field: 'owner_name',
            },
            url: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING,
            },
            category: {
                type: DataTypes.ENUM,
                values: ['economics', 'political', 'social'],
            },
            version: {
                type: DataTypes.INTEGER,
                allowNull: false,
                required: true,
            },
            ownerUserId: {
                type: DataTypes.BIGINT,
                field: 'owner_user_id',
            },
            sharedTo: {
                type: DataTypes.ARRAY(DataTypes.BIGINT),
                field: 'shared_to',
            },
            isLastVersion: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                required: true,
                field: 'is_last_version',
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
    Document.associate = function (models) {};
    return Document;
};
