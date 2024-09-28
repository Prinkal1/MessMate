const { useRevalidator } = require('react-router-dom');
const  User  = require('../models/User');
const Parser = require('json2csv').Parser;

const getAllStudents = async (req, res) => {

    let success = false;
    // const { accountType } = req.body;
    try {
        const user = await User.find({ accountType: 'Student' });
        success = true;
        res.json({success, user});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const deleteStudent = async (req, res) => {
    let success = false;
    try {
      // Get the student ID from request parameters
      const { id } = req.params;
  
      // Find the student by ID and delete if accountType is "Student"
      const user = await User.findOneAndDelete({ _id: id, accountType: 'Student' });
  
      if (!user) {
        return res.status(404).json({ success, errors: [{ msg: 'Student not found' }] });
      }
  
      success = true;
      res.json({ success, msg: 'Student deleted successfully' });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
  };
  

const csvStudent = async (req, res) => {
    let success = false;
    try {
        

        const students = await User.find({ accountType: 'Student' });

        // Map over students to create an array of objects containing the desired fields
        const csvData = students.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            messacc: user.messacc,
        }));

        const fields = ['firstName', 'lastName', 'email', 'messacc'];

        const opts = { fields };

        const parser = new Parser(opts);
        const csv = parser.parse(csvData);
        success = true;
        res.json({success, csv});
    } catch (err) {
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

module.exports = {
    getAllStudents,
    deleteStudent,
    csvStudent
}