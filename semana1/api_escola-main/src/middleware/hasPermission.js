const { UserRole, PermissionRole } = require('../models');

function hasPermission(requiredPermissions) {
    return async (req, res, next) => {
        try {
            const userId = req.payload.id; // Obtém o ID do usuário do payload do token

            // Obtém todas as roles do usuário
            const userRoles = await UserRole.findAll({ where: { userId } });

            // Verifica se o usuário tem pelo menos uma role
            if (userRoles.length === 0) {
                return res.status(403).json({ message: 'Acesso negado: Nenhuma role encontrada.' });
            }

            // Obtém todas as permissions associadas às roles do usuário
            const permissions = await PermissionRole.findAll({
                where: { roleId: userRoles.map(role => role.roleId) },
                include: [{ model: Permission }]
            });

            const userPermissions = permissions.map(permission => permission.Permission.description);

            // Verifica se o usuário possui pelo menos uma das permissões requeridas
            const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission));
            if (!hasPermission) {
                return res.status(403).json({ message: 'Acesso negado: Permissão não permitida.' });
            }

            next(); // Se o usuário tiver a permissão, continua para o próximo middleware ou rota
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao verificar permissões.' });
        }
    };
}

module.exports = { hasPermission };
