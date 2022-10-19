function isAlpha(input) {
    for (let i=0; i<input.length; i++) {
        if (!isNaN(parseFloat(input[i]))) {
            return false;
        }
    }
    return true;
}

function validation(req,res,next) {
    const postData = req.body;
    let emptyCount = 0;
    let errors = [];

    if (postData.first_name === '') {
        emptyCount++;
    } else if (postData.first_name.length < 2) {
        errors.push("First Name must be at least 2 characters.");
    } else if (postData.first_name.length > 45) {
        errors.push("First Name must not be longer than 45 characters.");
    } else if (!isAlpha(postData.first_name)) {
        errors.push("First Name must not contain numbers.");
    }
    
    if (postData.last_name === '') {
        emptyCount++;
    } else if (postData.last_name.length < 2) {
        errors.push("Last Name must be at least 2 characters.");
    } else if (postData.last_name.length > 45) {
        errors.push("Last Name must not be longer than 45 characters.");
    } else if (!isAlpha(postData.last_name)) {
        errors.push("Last Name must not contain numbers.");
    }
    
    if (postData.email === '') {
        emptyCount++;
    } else if (postData.email.split('@')[1] === undefined || postData.email.split('@')[1].split(".")[1] === undefined) {
        errors.push("Email is invalid.");
    }

    if (postData.password === '') {
        emptyCount++;
    } else if (postData.password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }

    if (postData.conf_password === '' || postData.conf_password !== postData.password) {
        errors.push("Passwords do not match.");
    }

    if (errors.length === 0) {
        next();
    } else if (errors.length > 0 && emptyCount === 0) {
        req.flash("reg_errors", errors);
        res.redirect('/');
    } else if (emptyCount > 0) {
        req.flash("reg_errors", "Please fill in all fields.");
        res.redirect('/');
    }
}

module.exports = validation;