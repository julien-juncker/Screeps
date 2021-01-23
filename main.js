var creepsController = require('creep.creepsController');

module.exports.loop = function() {
    // Get room name
    var curr_room = Game.rooms["W9N9"];
    
    // Define params
    if(curr_room.memory.params == null) {
        curr_room.memory.params = new Object();
    }
    curr_room.memory.params.harvester_count = 3;
    curr_room.memory.params.builder_count = 3;
    curr_room.memory.params.upgrader_count = 4;
    
    creepsController.run(curr_room);
    
    // Get source in room
    if(curr_room.memory.sourcesId == null || curr_room.memory.sourcesId.length == 0) {
        curr_room.memory.sourcesId = [];
        var sources = curr_room.find(FIND_SOURCES);
        curr_room.memory.sourcesId[0] = sources[0].id;
        curr_room.memory.sourcesId[1] = sources[1].id;
        curr_room.memory.sourceSwitcher = false;
    }
    
    // Tower defense
    defendRoom(curr_room);
}

function defendRoom(curr_room) {
    var hostiles = curr_room.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${curr_room.name}`);
        var towers = curr_room.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}