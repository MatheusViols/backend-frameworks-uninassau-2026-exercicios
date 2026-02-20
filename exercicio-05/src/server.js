// TODO: Implemente validação de registro aqui
//
// Use express-validator:
// const { body, validationResult } = require('express-validator');
//
// Criar rota POST /register com validações:
// - body('name').notEmpty().withMessage('Nome é obrigatório')
// - body('email').isEmail().withMessage('Email inválido')
// - body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
//
// No handler da rota:
// - const errors = validationResult(req);
// - if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
// - Se válido: res.status(201).json({ message: 'Usuário registrado', user: req.body });

