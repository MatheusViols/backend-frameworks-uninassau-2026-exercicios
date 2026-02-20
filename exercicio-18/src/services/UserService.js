// TODO: Implementar UserService com validações
class UserService {
  constructor(userModel) {
    this.User = userModel;
  }

  /**
   * Validar email
   */
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Validar idade (>= 18)
   */
  validateAge(age) {
    return age >= 18;
  }

  /**
   * Hash de senha (simulado - não use em produção!)
   */
  hashPassword(password) {
    return `hashed_${password}`;
  }

  /**
   * Criar usuário com validações
   */
  async createUser(data) {
    // TODO: Implementar validações e criação
    // 1. Validar email
    // 2. Validar idade
    // 3. Hash da senha
    // 4. Chamar User.create()
    // 5. Retornar usuário criado
  }

  /**
   * Buscar usuário por ID
   */
  async getUserById(id) {
    // TODO: Implementar busca
  }

  /**
   * Buscar usuários ativos
   */
  async getActiveUsers() {
    // TODO: Implementar busca de usuários ativos
  }
}

module.exports = UserService;
