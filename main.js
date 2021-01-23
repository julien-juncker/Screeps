var creepsController = require('creep.creepsController');
var defenseController = require('defense.defenseController');

module.exports.loop = function() {
    // Get room name
    var curr_room = Game.rooms["W9N9"];
    
    parametersController(curr_room);
    
    creepsController.run(curr_room);
    
    defenseController.run(curr_room);
}

function parametersController(curr_room) {
    // Define params
    if(curr_room.memory.params == null) {
        curr_room.memory.params = new Object();
    }
    
    if(curr_room.energyCapacityAvailable <= 300) {
        // If we don't have extension
        curr_room.memory.params.harvester_count = 1;
        curr_room.memory.params.builder_count = 0;
        curr_room.memory.params.upgrader_count = 1;
        curr_room.memory.params.preset = 2;
    } else {
        curr_room.memory.params.harvester_count = 3;
        curr_room.memory.params.builder_count = 3;
        curr_room.memory.params.upgrader_count = 4;
        curr_room.memory.params.preset = 1;
    }
    
    // Get source in room
    if(curr_room.memory.sourcesId == null || curr_room.memory.sourcesId.length == 0) {
        curr_room.memory.sourcesId = [];
        var sources = curr_room.find(FIND_SOURCES);
        curr_room.memory.sourcesId[0] = sources[0].id;
        curr_room.memory.sourcesId[1] = sources[1].id;
        curr_room.memory.sourceSwitcher = false;
    }
}