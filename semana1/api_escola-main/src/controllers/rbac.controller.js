const Role = require('../models/Role'); // Importa o modelo de Role
const Permission = require('../models/Permission'); // Importa o modelo de Permission
const User = require('../models/User'); // Importa o modelo de User
const UserRole = require('../models/UserRole'); // Importa o modelo de UserRole
const PermissionRole = require('../models/PermissionRole'); // Importa o modelo de PermissionRole

class RbacController {
    // Método para criar uma nova permissão
    async createOnePermission(req, res) {
        try {
            const { description } = req.body;

            const permission = await Permission.create({ description });
            res.status(201).json(permission);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao criar a permissão.', error: error.message });
        }
    }

    // Método para criar um novo papel (role)
    async createOneRole(req, res) {
        try {
            const { description } = req.body;

            const role = await Role.create({ description });
            res.status(201).json(role);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao criar o papel.', error: error.message });
        }
    }

    // Método para listar todas as permissões
    async listPermissions(req, res) {
        try {
            const permissions = await Permission.findAll();
            res.json(permissions);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao listar permissões.', error: error.message });
        }
    }

    // Método para listar todos os papéis (roles)
    async listRoles(req, res) {
        try {
            const roles = await Role.findAll();
            res.json(roles);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao listar papéis.', error: error.message });
        }
    }

    // Método para listar permissões por papel (role)
    async listPermissionsByRole(req, res) {
        try {
            const { roleId } = req.params;

            const permissions = await PermissionRole.findAll({
                where: { roleId },
                include: [{ model: Permission }]
            });

            res.json(permissions);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao listar permissões para o papel.', error: error.message });
        }
    }

    // Método para adicionar um usuário a um papel (role)
    async addRoleToUser(req, res) {
        try {
            const { userId, roleId } = req.body;

            const userRole = await UserRole.create({ userId, roleId });
            res.status(201).json(userRole);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao adicionar o papel ao usuário.', error: error.message });
        }
    }

    // Método para adicionar uma permissão a um papel (role)
    async addPermissionToRole(req, res) {
        try {
            const { roleId, permissionId } = req.body;

            const permissionRole = await PermissionRole.create({ roleId, permissionId });
            res.status(201).json(permissionRole);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao adicionar a permissão ao papel.', error: error.message });
        }
    }
}

module.exports = new RbacController();
