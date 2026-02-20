# Solução: Exercício 06

## src/models/User.js
```javascript
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');
let nextId = 1;

class User {
  static loadUsers() {
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, '[]');
      }
      const data = fs.readFileSync(filePath, 'utf8');
      const users = JSON.parse(data);
      
      if (users.length > 0) {
        nextId = Math.max(...users.map(u => u.id)) + 1;
      }
      
      return users;
    } catch (error) {
      return [];
    }
  }

  static saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }

  static findAll() {
    return this.loadUsers();
  }

  static findById(id) {
    const users = this.loadUsers();
    return users.find(u => u.id === id) || null;
  }

  static create(data) {
    const users = this.loadUsers();
    const user = { id: nextId++, ...data };
    users.push(user);
    this.saveUsers(users);
    return user;
  }

  static update(id, data) {
    const users = this.loadUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) return null;
    
    users[index] = { id, ...data };
    this.saveUsers(users);
    return users[index];
  }

  static delete(id) {
    const users = this.loadUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) return false;
    
    users.splice(index, 1);
    this.saveUsers(users);
    return true;
  }
}

module.exports = User;
```
