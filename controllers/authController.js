import hasPassword, { comparePassword } from "../helpers/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        // vallidations
        if (!name) {
            return res.send({ error: "Name is Required" })
        }
        if (!email) {
            return res.send({ error: "email is Required" })
        }
        if (!password) {
            return res.send({ error: "password is Required" })
        }
        if (!phone) {
            return res.send({ error: "phone is Required" })
        }
        if (!address) {
            return res.send({ error: "address is Required" })
        }

        // check user

        const existingUser = await userModel.findOne({ email })

        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already email registerd please login "
            })
        }
        // register user

        const hashedpasssword = await hasPassword(password)
        // save
        const user = await new userModel({ name, email, password: hashedpasssword, phone, address }).save();
        res.status(201).send({
            success: true,
            message: "User Registerd Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}



// post login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email  is not Registerd "
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        // Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:'2d'});
        res.status(200).send({
            success: true,
            message: "login Successfull",
            user:{
                name:user.name,
                email:user.email
                
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "login failed",
            error
        })
    }
}