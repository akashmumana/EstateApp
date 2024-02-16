import express from 'express'
import { userupdate , deleteuser, signout, getListing, getUserListings} from '../controller/user.controller.js'
import {verifytoken  } from '../utile/verifytoken.js'
const router = express.Router()

router.put('/update/:id',verifytoken,userupdate)
router.delete('/delete/:id',verifytoken, deleteuser)
router.delete('/signout/:id',verifytoken, signout)
router.get('/listings/:id', verifytoken, getUserListings)
    
export default router