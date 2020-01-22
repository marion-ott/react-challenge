const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

router
    .route('/delete')
    .get(dataController.deleteAll)

/** 
 * Provide an action param
 * 'import' to import all data
 * 'delete' to delete all data in case of previous error
*/
router
    .route('/:action')
    .get(dataController.importSkills, dataController.importStudents, dataController.updateStudentSkills)

module.exports = router;
