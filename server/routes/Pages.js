const express = require("express")
const router = express.Router()

//messoff
const{
    requestMessOff,
    countMessOff,
    listMessOff ,
    updateMessOff
}= require("../controllers/MessOff")

//menu
const {
    menufetch,
    menuadd,
    menuUpdate,
    menuAll,
    menudelete
} = require("../controllers/Menu")

//notification
const{
    addNotification,
    fetchNotification
}= require("../controllers/Notification")

//complaint
const{
    registerComplaint ,
    fetchComplaint,
    getbystudent,
    resolve
}= require("../controllers/Complaint")

//suggestion
const{
    registerSuggestion ,
    getbyadminSuggestion,
    getbystudentSuggestion,
    updateSuggestion
}= require("../controllers/Suggestion")

//user
const{
    getAllStudents,
    deleteStudent,
    csvStudent
}= require("../controllers/User")

//attendance
const{
    markAttendance,
    getAttendance,
    getAllAttendance,
    updateAttendance
}= require("../controllers/Attendance")

//messoff
router.post('/requestMessOff', requestMessOff);
router.post('/countMessOff', countMessOff);
router.get('/listMessOff', listMessOff);
router.post('/updateMessOff', updateMessOff);

//user
router.get("/getAllStudents" ,getAllStudents)
router.delete("/deleteStudent/:id",deleteStudent)
router.get("/csvStudent",csvStudent)

//attendance
router.post("/markAttendance",markAttendance)
router.post("/getAttendance",getAttendance)
router.put("/updateAttendance",updateAttendance)
router.get("/getAllAttendance",getAllAttendance)

//menu
router.get("/menufetch/:day",menufetch)
router.post("/menuadd" ,menuadd)
router.put("/menuUpdate" ,menuUpdate)
router.get("/menuAll",menuAll)
router.delete("/menudelete",menudelete)


//notification
router.post("/addNotification" ,addNotification)
router.get("/fetchNotification",fetchNotification)

//complaint

router.get("/fetchComplaint",fetchComplaint)

router.post('/registerComplaint', registerComplaint);

router.post('/fetchComplaintStudent', getbystudent);

router.post('/resolveComplaint', resolve);


// suggestion
router.get("/getbyadminSuggestion",getbyadminSuggestion)

router.post('/registerSuggestion', registerSuggestion);

router.post('/getbystudentSuggestion', getbystudentSuggestion);

router.post('/updateSuggestion', updateSuggestion);

module.exports = router