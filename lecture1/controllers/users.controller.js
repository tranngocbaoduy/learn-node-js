const shortid = require('shortid'); // create new random unique id 
var db = require('../db')

message = {
    status: true,
    content: ''
}

module.exports.index = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function (req, res) {
    var s = req.query.p;
    var matchedUsers = db.get('users').value().filter(item => item.name.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    res.render('users/index', {
        users: matchedUsers,
        s: s
    });
};

module.exports.create = (req, res) => res.render('users/create', {
    message: {
        status: true,
        content: ''
    },
});

module.exports.postCreate = function (req, res) {
    let check = validate(req);
    if (check) {
        db.get('users')
            .push({
                id: shortid.generate(),
                values: req.body,
            })
            .write()
        res.redirect('/users')
    } else {
        res.render('users/create', {
            values: req.body,
            message: message,
        })
    }
}

module.exports.get = function (req, res) {
    let id = req.params.id;
    let user = db.get('users')
        .find({
            id: id
        })
        .value()
    res.render('users/info', {
        user: user
    })
}

function validate(req) {
    let name = req.body.name;
    let phone = req.body.phone;
    let age = req.body.age;
    let address = req.body.address;

    if (!name || name === '') {
        message = {
            status: false,
            content: 'Name is null',
        }
        return false;
    }
    if (!age || age === '' || isNaN(age)) {
        message = {
            status: false,
            content: 'Age is null or not a number',
        }
        return false;
    }
    if (parseInt(age) <= 5 || parseInt(age) > 100) {
        message = {
            status: false,
            content: 'You\'re not a human',
        }
        return false;
    }
    if (!phone || phone === '' || isNaN(phone)) {
        message = {
            status: false,
            content: 'Phone is null or not a number',
        }
        return false;
    }
    if (phone.length > 12 || phone.length < 9) {
        message = {
            status: false,
            content: 'Phone is wrong',
        }
        return false;
    }

    if (!address || address === '') {
        message = {
            status: false,
            content: 'Address is null',
        }
        return false;
    }
    return true;
}