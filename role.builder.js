/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
            
            //define new source
            var indexSource = creep.room.memory.sourceSwitcher ? 1 : 0;
            creep.memory.source = creep.room.memory.sourcesId[indexSource];
            creep.room.memory.sourceSwitcher = !creep.room.memory.sourceSwitcher;
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            // find contruction or tower or repair road
            
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => { return (structure.structureType == STRUCTURE_TOWER) } });
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(tower.store[RESOURCE_ENERGY] != 1000) {
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            }
            else {
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
                
                targets.sort((a,b) => a.hits - b.hits);
                
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
        else {
            var source = Game.getObjectById(creep.memory.source);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;