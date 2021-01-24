/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.preset');
 * mod.thing == 'a thing'; // true
 */

var creepPreset = {
    run: function(curr_room) {
        var creepPresetList = [];

        switch(curr_room.memory.params.preset) {
            case 1:
                // harvester
                creepPresetList.push([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]);
                
                // upgrader
                creepPresetList.push([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]);
                
                // builder
                creepPresetList.push([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]);
                break;
            case 2:
                // harvester
                creepPresetList.push([WORK, CARRY, CARRY, MOVE]);
                
                // upgrader
                creepPresetList.push([WORK, CARRY, CARRY, MOVE]);
                
                // builder
                creepPresetList.push([WORK, CARRY, CARRY, MOVE]);
        }
        return creepPresetList;
    }
}

module.exports = creepPreset;