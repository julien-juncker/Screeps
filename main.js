var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCreateCreeps = require('role.createcreeps');

module.exports.loop = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(Memory.spawn == null) {
        Memory.spawn = true;
    }
    
    if(Game.rooms["W9N9"].memory.sourcesId == null || Game.rooms["W9N9"].memory.sourcesId.length == 0) {
        Game.rooms["W9N9"].memory.sourcesId = [];
        var sources = Game.rooms["W9N9"].find(FIND_SOURCES);
        Game.rooms["W9N9"].memory.sourcesId[0] = sources[0].id;
        Game.rooms["W9N9"].memory.sourcesId[1] = sources[1].id;
        Game.rooms["W9N9"].memory.sourceSwitcher = false;
    }
    
    
    roleCreateCreeps.run();
    
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
    
    defendRoom(Game.rooms["W9N9"].name);
}

function defendRoom(roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}