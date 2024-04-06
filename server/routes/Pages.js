const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")

const {
    menufetch,
    menuadd,
    menuUpdate,
    menuAll
} = require("../controllers/Menu")

router.get("/menufetch/:day",menufetch)
router.post("/menuadd", auth ,menuadd)
router.put("/menuUpdate", auth ,menuUpdate)
router.get("/menuAll",menuAll)

module.exports = router