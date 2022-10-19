const User = require('../models/User');

class Users {

    index(req,res) {
        if (req.session.userId) {
            res.redirect('/students/profile');
        }

        let viewData = {
            reg_success: req.flash('reg_success'),
            reg_errors: req.flash('reg_errors'),
            login_errors: req.flash('login_errors')
        }

        res.render('users/index', viewData);
    }

    async profile(req,res) {
        if (!req.session.userId) {
            res.redirect('/');
        }
        const user = await User.getUserById(req.session.userId);
        console.log(user);
        res.render('users/students/profile', user);
    }

    async register(req,res) {
        console.log(req.body);
        const result = await User.createUser(req.body);
        if (result === true) {
            req.flash('success', "User successfully created.")
        } else if (result === false){
            req.flash('errors', "Failed to register account.")
        } else if (result === 'taken') {
            req.flash('errors', "Email is already taken.")
        }
        res.redirect('/');
    }

    async login(req,res) {
        console.log(req.body);
        const id = await User.loginUser(req.body);
        if (id) {
            req.session.userId = id; 
            res.redirect('/students/profile');
        } else {
            req.flash('login_errors', "Account not found.");
            res.redirect('/');
        }
    }

    logoff(req,res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new Users;