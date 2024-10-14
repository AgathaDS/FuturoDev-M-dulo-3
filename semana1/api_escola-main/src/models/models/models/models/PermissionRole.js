// models/PermissionRole.js
module.exports = (sequelize, DataTypes) => {
    const PermissionRole = sequelize.define('PermissionRole', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Roles',
                key: 'id'
            }
        },
        permissionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Permissions',
                key: 'id'
            }
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

    return PermissionRole;
};
