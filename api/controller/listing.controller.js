import Listing from "../model/listingmodel.js"
import { errorHandler } from "../utile/errorHandler.js"


export const creatlisting = async (req, res, next) => {

    try {
        const listingdata = await Listing.create(req.body)

        return res.status(200).json(listingdata)
    } catch (error) {
        next(error)
    }

}
export const deletelisting = async (req, res, next) => {
    const dellisting = await Listing.findById(req.params.id)

    if (!dellisting) {
        return next(errorHandler(404, "Listing not found"))
    }
    if (req.user.id !== dellisting.userRef) {
        return next(errorHandler(402, "user not unauthenticated"))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json("listing has been deleted")
    } catch (error) {
        next(error)
    }
}


export const updatelisting = async (req, res, next) => {
    const updatelisting = await Listing.findById(req.params.id)
    if (!updatelisting) {
        return next(errorHandler(404, "Listing not found"))
    }
    if (req.user.id !== updatelisting.userRef) {
        return next(errorHandler(402, "user not unauthenticated"))
    }
    try {
        await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json(updatelisting)
    } catch (error) {
        next(error)
    }

}
export const getListing = async (req, res, next) => {
    console.log(req.params.id);
    try {
        
        const getlisting = await Listing.findById(req.params.id)
        if (!getlisting) {
            return next(errorHandler(404, "Listing not found"))
        }
        res.status(200).json(getlisting);

    } catch (error) {
        next(error)
    }

}

export const getAllListing = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const stratIndex = parseInt(req.query.stratIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }
        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ["sale", "rent"] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const listingall = await Listing.find({
            name: { $regex: searchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,
        })
        .sort({ [sort]:order})
        .limit(limit)
        .skip(stratIndex).exec();
        

        return res.status(200).json(listingall)


    } catch (error) {
        next(error)
    }


}