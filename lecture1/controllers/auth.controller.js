db = require('../db')

module.exports.login = function (req, res) {
    res.render('users/login');
}

module.exports.postLogin = function (req, res) {
    const userName = req.params.userName;
    const password = req.params.password;

    console.log(userName, password);
}