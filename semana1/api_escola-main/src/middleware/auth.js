const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        console.log("Entramos no Middleware");

        const { authorization } = req.headers;

        // Verifica se o cabeçalho de autorização está presente
        if (!authorization) {
            return res.status(401).json({
                message: "Token não fornecido!"
            });
        }

        // Verifica se o formato do cabeçalho está correto
        const parts = authorization.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Formato do token inválido! Use o formato: 'Bearer <token>'"
            });
        }

        // Extrai o token do cabeçalho "Bearer"
        const token = parts[1];

        // Verifica e decodifica o token
        req['payload'] = verify(token, process.env.SECRET_JWT);
        next();
    } catch (error) {
        let errorMessage = "Autenticação Falhou!";
        if (error.name === "TokenExpiredError") {
            errorMessage = "O token expirou!";
        } else if (error.name === "JsonWebTokenError") {
            errorMessage = "Token inválido!";
        }

        return res.status(401).json({
            message: errorMessage,
            cause: error.message
        });
    }
}

module.exports = { auth };

