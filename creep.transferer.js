/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.transferer');
 * mod.thing == 'a thing'; // true
 */

var creepTransferer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.transferer) {
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
                var linkTarget = Game.getObjectById("cdef425685ec073");
                if(linkTarget != null && linkTarget.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if(creep.transfer(linkTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linkTarget, {visualizePathStyle: {stroke: '#ffffff'}});
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
                var source = Game.getObjectById(creep.memory.source);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        } else {
            if(creep.memory.droping && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.droping = false;
            } 
            if(!creep.memory.droping && creep.carry.energy == creep.carryCapacity) {
                creep.memory.droping = true;
            }
            if(creep.memory.droping){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                var linkTarget = Game.getObjectById("706c3788d67b5e6");
                if(linkTarget != null && linkTarget.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if(creep.withdraw(linkTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linkTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
}

module.exports = creepTransferer;