/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.storageTransferer');
 * mod.thing == 'a thing'; // true
 */

var creepStorageTransferer = {
    run: function(creep) {
        if(creep.memory.droping && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.droping = false;
            
            //define new source
            var indexSource = creep.room.memory.sourceSwitcher ? 1 : 0;
            creep.memory.source = creep.room.memory.sourcesId[indexSource];
            creep.room.memory.sourceSwitcher = !creep.room.memory.sourceSwitcher;
        } 
        if(!creep.memory.droping && creep.carry.energy == creep.carryCapacity) {
            creep.memory.droping = true;
        }
        if(creep.memory.droping){
            var extensionsTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(extensionsTargets.length > 0) {
                if(creep.transfer(extensionsTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensionsTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var storageTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        
                    }
                });
                if(storageTargets.length > 0) {
                    if(creep.transfer(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storageTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        } else {
                var storageTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(storageTargets.length != 0) {
                    if(creep.withdraw(storageTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storageTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }            

        }
    }
}

module.exports = creepStorageTransferer;