// models/Role.js
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
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

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: 'UserRole',
            foreignKey: 'roleId',
            otherKey: 'userId'
        });
        Role.belongsToMany(models.Permission, {
            through: 'PermissionRole',
            foreignKey: 'roleId',
            otherKey: 'permissionId'
        });
    };

    return Role;
};
