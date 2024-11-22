const express = require("express");
const router = express.Router();

const {
    addBill,
    fetchBill,
    calculateStudentBills,
} = require("../controllers/Bill");

router.post("/addBill", addBill); // Endpoint to add bill for the month
router.get("/fetchBill/:month/:year", fetchBill); // Endpoint to fetch bill
router.get("/calculateStudentBills/:month/:year", calculateStudentBills); // Endpoint to calculate student bills

module.exports = router;
