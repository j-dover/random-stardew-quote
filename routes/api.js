var express = require('express');
var router = express.Router();

var villager_controller = require('../controllers/villagerController');

router.get('/villagers', villager_controller.getVillagers);
router.get('/villager/:villager_id', villager_controller.getVillagerById);
module.exports = router;
