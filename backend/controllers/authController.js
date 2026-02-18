const bcrypt=require('bcrypt')
const User = require('../models/User')
const jwt=require('jsonwebtoken')

//signup user
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    } 

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
exports.login = async (req,res) => {
    try {
        const {email,password}=req.body;

         const user = await User.findOne({ email });

        if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    //compare password
    const match= await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(400).json({
            message:"password incorret"
        })
    }

    //generate jwt token

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
    res.json({
        message:"login successfully",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
        
    } catch (error) {
        res.status(500).json({
            message:error,
            message:"login server error "
        })
    }
}