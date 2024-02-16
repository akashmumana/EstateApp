import express from 'express';
import {verifytoken  } from '../utile/verifytoken.js'
import { creatlisting, deletelisting, getAllListing, getListing, updatelisting } from '../controller/listing.controller.js';


const router =express.Router();

router.post('/create',verifytoken,creatlisting)
router.delete('/delete/:id',verifytoken,deletelisting)
router.put('/update/:id',verifytoken,updatelisting)
router.get('/get/:id',getListing)
router.get('/get',getAllListing)
export default router;