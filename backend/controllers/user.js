import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Login function
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json(
                {
                    message: "Invalid data",
                    success: false
                }
            )
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }
        //token for login
        // const tokenData={
        //     id:user._id
        // }
        const token= await jwt.sign({user},"sgfgfgfgh",{expiresIn:"1d"});
        return res.status(200).cookie("token",token,{httpOnly:true}).json({
            message:`Welcome back ${user.fullName} Login Successfully`,
            success:true,
            user,
        });

    } catch (error) {
       console.log(error);
    }
}
//logout function
export const Logout=async(req,res)=>{
    return res.status(200).clearCookie('token').json({
message:"Logout Successfully",
success:true
    });
}

//Signup function
export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(401).json(
                {
                    message: "Invalid data",
                    success: false
                }
            )
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "This Email is already used",
                success: false
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            password: hashPass
        });
        res.status(200).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            success: false,
            error
        })
    }
}
