// app/routes.js
var User            = require('../app/models/user');
//moment
var moment = require('moment');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log("Loading Profile");
        var todayis = moment().format("d");
        console.log("new day is " + todayis);
        console.log("Today is " + moment().format('ddd'));
        //console.log(req.user);
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
        console.log(req.user);
    });

    app.get('/day1', isLoggedIn, function(req,res) {
      console.log("loading day 1");
      res.render('day1.ejs', {
        user : req.user
      });
    });

    app.get('/day2', isLoggedIn, function(req,res) {
      console.log("loading day 2");
      res.render('day2.ejs', {
        user : req.user
      });
    });

    app.get('/day3', isLoggedIn, function(req,res) {
      console.log("loading day 3");
      res.render('day3.ejs', {
        user : req.user
      });
    });

    app.get('/test', isLoggedIn, function(req,res) {
      console.log("Test, getting user");
      var a = req.user;
      var id = req.user.id;
      console.log(a);
      //find one by ID
      //console.log("Now find by ID");
      //User.findById(id, function (err, results) {
      //find one and update
      //console.log("Now find one and update");
      //User.findOneAndUpdate(id, a, function(err, ))
      //console.log("now user.find");
      //var b = User.find(function(err, users) {
      //  if(err) return console.error(err);
      //  console.log(users);
      //});
      a.datedata.lastlogin = Date.now();
      if (!req.user.datedata.joindate){
        console.log("No join date detected, changing that to current date");
        req.user.datedata.joindate = Date.now();
        req.user.save();
      }
      req.user = a;
      req.user.save();
      res.render('test.ejs', {
        user : req.user
      });
    });

    app.post('/test/addnote', isLoggedIn, function(req, res) {
      console.log("addnote request is:");
      console.log(req.body);
      req.user.notes.addin = req.body.addin;
      var b = req.user;
      req.user.save();
      //res.render('test.ejs', {
      //  user : b
      //});
      res.redirect('/profile');
    });

    app.post('/day1/doneday', isLoggedIn, function(req,res) {
      console.log("Running done day function");
      console.log("Req.body is");
      console.log(req.body);
      if (req.body.doneday == "COMPLETE EXCERCISE!") {
        console.log("Excercise done!");
        req.user.inapp.day1 = false;
        req.user.save();
        console.log("Excercise 1 is " + req.user.inapp.day1);
      } else {
        console.log("Error" + req.body.doneday);
      };
      res.redirect('/profile');
    });

    app.post('/day2/doneday', isLoggedIn, function(req,res) {
      console.log("Running done day2 function");
      console.log("Req.body is");
      console.log(req.body);
      if (req.body.doneday == "COMPLETE EXCERCISE!") {
        console.log("Excercise done!");
        req.user.inapp.day2 = false;
        req.user.save();
        console.log("Excercise 2 is " + req.user.inapp.day2);
      } else {
        console.log("Error" + req.body.doneday);
      };
      res.redirect('/profile');
    });

    app.post('/day3/doneday', isLoggedIn, function(req,res) {
      console.log("Running done day3 function");
      console.log("Req.body is");
      console.log(req.body);
      if (req.body.doneday == "COMPLETE EXCERCISE!") {
        console.log("Excercise done!");
        req.user.inapp.day3 = false;
        req.user.save();
        console.log("Excercise 3 is " + req.user.inapp.day3);
      } else {
        console.log("Error" + req.body.doneday);
      };
      res.redirect('/profile');
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
