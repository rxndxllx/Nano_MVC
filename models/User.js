const Model = require('../system/Model');

class User extends Model {

    async getUserByEmail(email) {
        const query = "SELECT id, first_name, last_name, email, password FROM users WHERE email = ?";
        const values = [email];
        const result = await this.doQuery(query, values);
        return result;
    }

    async getUserById(id) {
        const query = "SELECT first_name, last_name, email FROM users WHERE id = ?";
        const values = [id];
        const result = await this.doQuery(query, values);
        return result[0];
    }

    async createUser(user) {
        const db_user = await this.getUserByEmail(user.email);

        if (db_user.length > 0) {
            return 'taken';
        }

        const query = "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
        const values = [user.first_name, user.last_name, user.email, this.encryptPassword(user.password)];
        const result = await this.doQuery(query, values);
        
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    async loginUser(user) {
        const db_user = await this.getUserByEmail(user.email);
        console.log(db_user);
     
        if (db_user.length === 0) {
            return false;
        } else if (db_user[0].length === 0) {
            return false;
        } else if (!this.comparePassword(user.password, db_user[0].password)){
            return false;
        } else if (this.comparePassword(user.password, db_user[0].password)) {
            return db_user[0].id;
        }
    }
}

module.exports = new User;