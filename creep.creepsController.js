/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.creepsController');
 * mod.thing == 'a thing'; // true
 */
 
var roleHarvester = require('creep.harvester');
var roleUpgrader = require('creep.upgrader');
var roleBuilder = require('creep.builder');

function CreepFactory() {
    this.createCreep = function (type, curr_room) {
        var creep;
        var newName = type + Game.time;
        var first_sources = curr_room.find(FIND_SOURCES);
        
        switch(type) {
            case 'harvester':
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    {memory: {role: type, source: first_sources[0].id}}); 
                break;
            case 'builder':
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                    {memory: {role: type, source: first_sources[0].id}});
                break;
            case 'upgrader':
                console.log('Spawning new upgrader: ' + newName)
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                    {memory: {role: type, source: first_sources[0].id}});
                break;
        }
    }
    
    this.controlCreepSpawn = function(curr_room) {
        var upgraders =_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader:' + upgraders.length);
        if(upgraders.length < curr_room.memory.params.upgrader_count) {
            this.createCreep('upgrader', curr_room);
        }
        
        var harvesters =_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvester:' + harvesters.length);
        if(harvesters.length < curr_room.memory.params.harvester_count) {
            this.createCreep('harvester', curr_room);        
        }
        
        var builders =_.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder:' + builders.length);
        if(builders.length < curr_room.memory.params.builder_count) {
            this.createCreep('builder', curr_room); 
        }
    }
    
    this.creepsAction = function() {
        for(var name in Game.creeps) {
            console.log(name);
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }
    
    this.deleteCreepsMemory = function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
}

var creepController =  {
    run : function(curr_room) {
        var creepFactory = new CreepFactory();
        creepFactory.deleteCreepsMemory();
        creepFactory.controlCreepSpawn(curr_room);
        creepFactory.creepsAction();
    }
}

module.exports = creepController;