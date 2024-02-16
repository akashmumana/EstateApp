import { errorHandler } from '../utile/errorHandler.js';
import bcrypt from 'bcrypt';
import user from '../model/user.js';
import Listing from '../model/listingmodel.js';



export const userupdate = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update youer account'))

    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updateuser = await user.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })
        console.log(updateuser);
        const { password, ...rest } = updateuser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteuser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete youer account'))
    try {
        await user.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User deleted successfully')
    } catch (error) {
        next(error);
    }

}

export const signout = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only signout youer account'))
    try {

        res.status(200).clearCookie('access_token').json('User signout successfully')

    } catch (error) {
        next(errorHandler(500, "something went wrong user"));
    }

}

export const getListing = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'listing already exists'))
    try {
        const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id })
            res.status(200).json(listings)
        } catch (error) { next(error) }
    } else {
        return next(errorHandler(401, 'You can only view your own Listing....!'))
    }
}
