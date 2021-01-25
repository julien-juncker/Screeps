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
var roleLinkTransferer = require('creep.linkTransferer');
var roleStorageTransferer = require('creep.storageTransferer')
var preset = require('creep.preset');

function CreepFactory() {
    this.createCreep = function (type, curr_room, preset) {
        var creep;
        var newName = type + Game.time;
        var first_sources = curr_room.find(FIND_SOURCES);
        
        switch(type) {
            case 'harvester':
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(preset, newName,
                    {memory: {role: type, source: first_sources[0].id}}); 
                break;
            case 'builder':
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(preset, newName,
                    {memory: {role: type, source: first_sources[0].id}});
                break;
            case 'upgrader':
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(preset, newName,
                    {memory: {role: type, source: first_sources[0].id}});
                break;
            case 'linkTranferer':
                console.log('Spawning new link transferer: ' + newName);
                Game.spawns['Spawn1'].spawnCreep(preset, newName,
                    {memory: {role: type, transferer: curr_room.memory.params.linkTransfererControl, source: first_sources[0].id}});
                break;
        }
    }
    
    this.controlCreepSpawn = function(curr_room, creepPreset) {
        var harvesterPreset = creepPreset[0];
        var harvesters =_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraderPreset = creepPreset[1];
        var upgraders =_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builderPreset = creepPreset[2];
        var builders =_.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var linkTransfererPreset = creepPreset[3];
        var linkTranferers =_.filter(Game.creeps, (creep) => creep.memory.role == 'linkTranferer');
        
        // Harvester
        console.log('Harvester:' + harvesters.length);
        if(harvesters.length < curr_room.memory.params.harvester_count) {
            this.createCreep('harvester', curr_room, harvesterPreset);        
        }
        
        // Upgrader
        console.log('Upgrader:' + upgraders.length);
        if(upgraders.length < curr_room.memory.params.upgrader_count) {
            this.createCreep('upgrader', curr_room, upgraderPreset);
        }
        
        // Builder
        console.log('Builder:' + builders.length);
        if(builders.length < curr_room.memory.params.builder_count) {
            this.createCreep('builder', curr_room, builderPreset); 
        }
        
        // Transferer
        console.log('Transferer:' + linkTranferers.length);
        if(linkTranferers.length < curr_room.memory.params.link_transferer_count) {
            if(linkTranferers.length == 1) {
                curr_room.memory.params.linkTransfererControl = !linkTranferers[0].memory.transferer;
            }
            this.createCreep('linkTranferer', curr_room, linkTransfererPreset); 
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
            if(creep.memory.role == 'linkTranferer') {
                roleLinkTransferer.run(creep);
            }
            if(creep.memory.role == 'storageTransferer') {
                roleStorageTransferer.run(creep);
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
        var creepPreset = preset.run(curr_room);
        creepFactory.deleteCreepsMemory();
        creepFactory.controlCreepSpawn(curr_room, creepPreset);
        creepFactory.creepsAction();
    }
}

module.exports = creepController;