/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.harverster');
 * mod.thing == 'a thing'; // true
 */
 
var creepHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.droping && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.droping = false;
            
            //define new source
            //var sources = creep.room.find(FIND_SOURCES
            var indexSource = creep.room.memory.sourceSwitcher ? 1 : 0;
            creep.memory.source = creep.room.memory.sourcesId[indexSource];
            creep.room.memory.sourceSwitcher = !creep.room.memory.sourceSwitcher;
        } 
        if(!creep.memory.droping && creep.carry.energy == creep.carryCapacity) {
            creep.memory.droping = true;
        }
        if(creep.memory.droping){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            var source = Game.getObjectById(creep.memory.source);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
}

module.exports = creepHarvester;