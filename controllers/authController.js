const User = require('../Models/user.js');

// Routes1
module.exports.getlogin=(req,res,next)=>{
    res.render('login',{isAuthenticated: false})
}

exports.postLogin = (req, res, next) => {
    User.findById('64a9be8a60f2b7e03eea7e22')
      .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          console.log(err);
          res.redirect('/shop');
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/shop');
    });
  };