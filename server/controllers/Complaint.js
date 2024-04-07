const Complaint = require("../models/Complaint")

exports.addComplaint = async (req, res) =>{
    try{
        const{
            complaint,
            createdAt
        }= req.body

        //check all details are present
        if (
            !complaint
        ) {
            return res.status(403).send({
                success: false,
                message: "Adding complaint is required",
            });
        }
        const comp = await Complaint.create({
			complaint,
            createdAt
		});
        console.log(comp)
		return res.status(200).json({
			success: true,
			comp,
			message: "Complaint added successfully",
		});
    }catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "complaint cannot be added",
        });
    }
}

exports.fetchComplaint = async (req, res) =>{
    try {
        const comp = await Complaint.find();
        console.log(comp)
        return res.status(200).json({
			success: true,
			comp,
			message: "Complaint fetched successfully",
		});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}