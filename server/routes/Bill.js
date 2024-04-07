const express = require("express")
const router = express.Router()

//menu
const {
    addBill,
    fetchBill,
    addAdditionalBill,
    additionalBillfetch
} = require("../controllers/Bill")


//notification
router.post("/addBill" ,addBill)
router.get("/fetchBill",fetchBill)
router.post("/addAdditionalBill" ,addAdditionalBill)
router.get("/additionalBillfetch/:messacc" ,additionalBillfetch)


module.exports = router