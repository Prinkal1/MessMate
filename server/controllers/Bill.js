const AdditionalBill = require("../models/AdditionalBill");
const Bill = require("../models/Bill")

//to add diff bills
exports.addBill = async (req, res) =>{
    try{
        const{
            month,
            year,
            groceryBill,
            milkBill,
            vegeBill,
            totalBill
        }= req.body

        //check all details are present
        if (
            !month ||
            !year ||
            !groceryBill ||
            !milkBill||
            !vegeBill ||
            !totalBill 
        ) {
            return res.status(403).send({
                success: false,
                message: "Adding all fields are required",
            });
        }
        const bill = await Bill.create({
			month,
            year,
            groceryBill,
            milkBill,
            vegeBill,
            totalBill
		});
        console.log(bill)
		return res.status(200).json({
			success: true,
			bill,
			message: "Bill added successfully",
		});
    }catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Bill cannot be added",
        });
    }
}

//fetch whole data 
exports.fetchBill = async (req, res) =>{
    try {
        const bill = await Bill.find();
        console.log(bill)
        return res.status(200).json({
			success: true,
			bill,
			message: "Bill fetched successfully",
		});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


//add additional bill
exports.addAdditionalBill = async (req, res) =>{
    try{
        const{
            firstName,
            lastName,
            messacc,
            milk,
            maggi,
            tea,
            bread,
            monthlyBill
        }= req.body

        //check all details are present
        if (
            !firstName ||
            !lastName ||
            !messacc 
        ) {
            return res.status(403).send({
                success: false,
                message: "Adding details are required",
            });
        }
        const additionalbill = await AdditionalBill.create({
			firstName,
            lastName,
            messacc,
            milk,
            maggi,
            tea,
            bread,
            monthlyBill
		});
        console.log(additionalbill)
		return res.status(200).json({
			success: true,
			additionalbill,
			message: "Additional Bill added successfully",
		});
    }catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Additional Bill cannot be added",
        });
    }
}

//additionalbill fetch
exports.additionalBillfetch = async (req, res) =>{
    try {
        const messacc = req.params.messacc
        console.log({messacc})
        const additionalbill = await AdditionalBill.find({messacc});
		if (!additionalbill.length) {
			return res.status(404).json({
				success: false,
				message: `Additional Bill Not Found`,
			});
		}
        console.log(additionalbill)
        res.json(additionalbill);
    
      } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}