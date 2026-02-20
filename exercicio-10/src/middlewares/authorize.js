// TODO: Middleware de autorização
// function authorize(...roles) {
//   return (req, res, next) => {
//     if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ error: 'Sem permissão' });
//     }
//     next();
//   };
// }
//
// Uso: app.delete('/users/:id', authJWT, authorize('admin'), ...)

