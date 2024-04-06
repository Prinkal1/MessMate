const express = require("express")
const router = express.Router()

//menu
const {
    menufetch,
    menuadd,
    menuUpdate,
    menuAll
} = require("../controllers/Menu")

//notification
const{
    addNotification,
    fetchNotification
}= require("../controllers/Notification")

//menu
router.get("/menufetch/:day",menufetch)
router.post("/menuadd" ,menuadd)
router.put("/menuUpdate" ,menuUpdate)
router.get("/menuAll",menuAll)

//notification
router.post("/addNotification" ,addNotification)
router.get("/fetchNotification",fetchNotification)

module.exports = router