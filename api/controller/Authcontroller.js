
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import { errorHandler } from '../utile/errorHandler.js';
import user from '../model/user.js';
import Jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10)

    try {
        const userdata = await User.create({
            username,
            email,
            password: hashpassword
        })
        console.log(userdata)
        res.status(201).json("User Create Successfully.....");
    } catch (error) {
        return next(errorHandler(401, 'data already exits......'));
    }
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validatuser = await user.findOne({ email })
        if (!validatuser) {
            return next(errorHandler(404, 'User not found..'))
        }

        const validpassword = await bcrypt.compare(password, validatuser.password)

        if (!validpassword) {
            return next(errorHandler(404, "Wrong password.."))
        }

        const token = Jwt.sign({ id: validatuser._id }, process.env.JWT_SERVICE)

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validatuser)
    } catch (error) {
        next(error)
    }

}
export const google = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const token = Jwt.sign({ id: user._id }, process.env.JWT_SERVICE);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
        else {
            const generatedpassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashpassword = await bcrypt.hash(generatedpassword, 10);
            const newuser = await User.create({
                username: req.body.email,
                email: req.body.email,
                password: hashpassword,
                avatar: req.body.photo
            })
            console.log(newuser)

            const token = Jwt.sign({ id: newuser._id }, process.env.JWT_SERVICE);
            const { password: pass, ...rest } = newuser._doc;

            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }

    } catch (error) {
        next(error);
    }


}

