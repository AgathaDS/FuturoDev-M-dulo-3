// models/Permission.js
module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Role, {
            through: 'PermissionRole',
            foreignKey: 'permissionId',
            otherKey: 'roleId'
        });
    };

    return Permission;
};
