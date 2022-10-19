const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Model {
    
    async doQuery(query, values = '') {
        try {
            const result = await db.promise().query(query, values);
            // console.log("FROM PARENT MODEL,",result);
            return result[0];
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    encryptPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    comparePassword(raw, encrypted) {
        return bcrypt.compareSync(raw, encrypted);
    }
}

module.exports = Model;