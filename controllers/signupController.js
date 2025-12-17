const user = require("./../Models/signupmodel.js")

const signupUser = async(req,res) => {
    try{
        const{firstname , lastname , email , phone , password}=req.body;
        const newUser=User({
            firstname,
            lastname,
            email,
            phone,
            password,
        });
        const savedUser=await newUser.save();
        res.status(201).json({
            message : "User registered successfully",
            data: savedUser,
        });
    } catch(error){
        res.status(500).json({
            message : "Error Registered User",
            error: error.message,
        });
    }
};
module.exports = {
    signupUser,
}