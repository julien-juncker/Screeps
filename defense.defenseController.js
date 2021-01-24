/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('defense.defenseController');
 * mod.thing == 'a thing'; // true
 */

function DefenseFactory() {
    this.defendRoom = function (curr_room) {
        var hostiles = curr_room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${curr_room.name}`);
            var towers = curr_room.find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        } else {
            
            var towers = curr_room.find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach((tower) => {
                var closestDamagedWall = _.filter(tower.room.find(FIND_STRUCTURES), (wall) => (wall.structureType == STRUCTURE_WALL && wall.hits < 50000));
                if (closestDamagedWall) {
                    tower.repair(closestDamagedWall[0]);
                }
            });
        }
    }
}

var defenseController =  {
    run : function(curr_room) {
        var defenseController = new DefenseFactory();
        defenseController.defendRoom(curr_room);
    }
}

module.exports = defenseController;