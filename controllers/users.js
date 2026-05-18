const Listing  =require("../models/listing");
const User = require("../models/User");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup");
};


module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        // 🔥 THIS IS THE FIX
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });

    } catch (err) {
        console.log(err);
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};



module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");

};


module.exports.login = (req, res) => {

    console.log("Logged in user:", req.user);
    console.log("Redirect URL:", res.locals.redirectUrl);

    req.flash("success", "Welcome back, You are logged in!");

    let redirectUrl = res.locals.redirectUrl || "/listings"; // ✅ fallback
    res.redirect(redirectUrl);
  };

  module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
            }
            req.flash("success","you are logged out!");
            res.redirect("/listings");
    })
}