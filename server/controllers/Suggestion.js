const { validationResult } = require('express-validator');
const  Suggestion  = require('../models/Suggestion');


exports.registerSuggestion = async (req, res) => {
    let success = false;
   
    const { student, title, description } = req.body;
    try {
        const newSuggestion = new Suggestion({
            student,
            title,
            description
        });
        await newSuggestion.save();
        success = true;
        res.json({ success, msg: 'Suggestion registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


exports.getbyadminSuggestion = async (req, res) => {
    let success = false;
    try {
        const suggestions = await Suggestion.find().populate('user', ['firstName', 'email']);
        return res.status(200).json({
			success: true,
			suggestions,
			message: "Suggestion fetched successfully",
		});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


exports.getbystudentSuggestion = async (req, res) => {
    let success = false;
    
    const { student } = req.body;
    try {
        const suggestions = await Suggestion.find({ student });
        success = true;
        res.json({ success, suggestions });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.updateSuggestion = async (req, res) => {
    let success = false;
    const { id, status } = req.body;
    try {
        const suggestion = await Suggestion.findByIdAndUpdate(id, { status });
        suggestion.status = "solved";
        await suggestion.save();
        success = true;
        res.json({ success,suggestion, msg: 'Suggestion updated successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}