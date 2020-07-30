const sqlitecontroller = require('../controllers/sqlcontroller.js');
    express = require('express'), 
    router = express.Router()

    router.route('/getusers').post(sqlitecontroller.getUsers);

    router.route('/getFlowers').post(sqlitecontroller.getFlowers);
    router.route('/search').post(sqlitecontroller.search)
    router.route('/getSightings').post(sqlitecontroller.getSightings);
    router.route('/flowersUpdate').post(sqlitecontroller.flowersUpdate);
    router.route('/sightingsInsert').post(sqlitecontroller.sightingsInsert);
    router.route('/flowersDelete').post(sqlitecontroller.flowersDelete);
    router.route('/performance').get(sqlitecontroller.performance); 
    router.route('/getComments').post(sqlitecontroller.getComments);
    router.route('/postComments').post(sqlitecontroller.postComments);
  
module.exports = router;