var User = require('../models/user');

exports.user_login_get = function(req, res) {
    res.render('user_login', {message: ""});
};

exports.user_login_post = function(req, res) {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function(err, user){
        if (!user) {
            return res.render('user_login', {message: "Invalid credentials!"});
        }
           req.session.user = user;
           console.log(req.session.user)
           res.redirect('/');
        }
    );
}

exports.user_logout_get = function(req, res) {
    if (req.session) {
        // req.session.destroy(function(err) { // is express-session; else return TypeError
        //     console.log('redirecting')
        //   return res.redirect('/');
        // })
        req.session = null;
        return res.redirect('/');
    }
};

exports.user_new_password_get = function(req, res) {
    if (!req.session.user) return res.render('user_login', {
        message: "Vous devez être connecté pour change de mot de passe"});
    res.render('user_new_password', {message: ""});
}

exports.user_new_password_post = function(req, res) {
    console.log(req.session.user.username, req.body.old_password, req.body.new_password, req.body.new_password_confirm)
    User.findOne({
        username: req.session.user.username,
        password: req.body.old_password
    }, function(err, user){
        if (err) {console.log(err)}
        if (!user) {
            return res.render('user_new_password', {message: "Current password is invalid"});
        } else if (req.body.new_password!=req.body.new_password_confirm) {
            return res.render('user_new_password', {message: "The passwords are different"});
        } else {
            console.log('user id', user, user._id)
            User.findOneAndUpdate(
                {_id: user._id}, 
                {$set: { password: req.body.new_password }},
                {returnNewDocument: true},
                function(err, updated_user) {
                    console.log('updated_user', updated_user)
                    if (err) { return console.log(err) }
                    req.session.user = updated_user;
                    console.log(req.session.updated_user, req.session.updated_user)
                    res.redirect('/');
                })
        }
    });
}