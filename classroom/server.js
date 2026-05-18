const express = require("express");
const app = express();
const users = require("./routes/user");
const posts =  require("./routes/post"); 
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");



app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies", (req,res)=>{
//     res.cookie("madein","India", {signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//      res.cookie("madeIn","India");

//     res.send("sent you same cookies!");
// });

// app.get("/greet" , (req,res)=>{
//     let {name = "annymous"} = req.cookies;
//     req.send(`Hi, ${name}`)
// });


// app.get("/", (req,res)=>{
//     console.dir(req.cookies);
//     res.send("hi, i am priyam");
// });

// app.use("/users", users);
// app.use("/posts",posts);

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req,res)=>{
    let {name = "annoymous"} = req.query;

    req.session.name = name;

    if(name == "annoymous"){
        req.flash("error", "user not registered");
    } else {
        req.flash("success", "user registered successfully!");
    }

    res.redirect("/hello");
});

app.get("/hello", (req,res)=>{
    res.render("page.ejs",{name: req.session.name});
});



// app.get("/reqcount", (req,res)=>{
//     if( req.session.count){
//          req.session.count++;
//     }else{
//          req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`);
// });


// app.get("/test", (req,res)=>{
//     res.send("test successful!");
// });




app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
