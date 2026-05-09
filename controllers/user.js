const User = require("../models/user"); 

//signup
async function handleUserSignup(req, res) {

    const { name, email, password } = req.body;
    await User.create({ 
        name, 
        email,
        password 
    });
    return res.redirect("/");
};

//login
async function handleUserLogin(req, res) {

    const {  email, password } = req.body;
    const user = await User.findOne({ 
        email,
        password 
    });

    if(!user)
        return res.redirect("/login" , { error: "Invalid email or password" });

    return res.redirect("/");
};

module.exports = { handleUserSignup , handleUserLogin };

