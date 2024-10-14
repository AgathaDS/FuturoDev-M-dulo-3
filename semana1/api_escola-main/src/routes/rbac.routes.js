const { Router } = require('express');
const RbacController = require('../controllers/rbac.controller'); // Ajuste o caminho conforme necessário

const rbacRoutes = Router();

// Definindo as rotas para o RBAC
rbacRoutes.post('/permissions', RbacController.createOnePermission);  // Cria uma permission
rbacRoutes.post('/roles', RbacController.createOneRole);              // Cria uma role
rbacRoutes.get('/permissions', RbacController.listPermissions);        // Lista todas as permissions
rbacRoutes.get('/roles', RbacController.listRoles);                    // Lista todas as roles
rbacRoutes.get('/roles/:roleId/permissions', RbacController.listPermissionsByRole); // Lista permissões por role
rbacRoutes.post('/users/roles', RbacController.addRoleToUser);         // Adiciona um usuário a uma role
rbacRoutes.post('/roles/permissions', RbacController.addPermissionToRole); // Adiciona uma permission a uma role

module.exports = rbacRoutes; // Exporta as rotas para uso em outros arquivos
