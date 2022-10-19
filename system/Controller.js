class Controller {

    index(req,res) {
        res.render('welcome');
    }
}

module.exports = new Controller;