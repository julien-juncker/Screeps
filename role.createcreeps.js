/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.createcreeps');
 * mod.thing == 'a thing'; // true
 */
 
var roleCreateCreeps= {
    run: function(){
        var upgraders =_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader:' + upgraders.length);
        
        if(upgraders.length < 3) {
            var newName = 'Upgrader' + Game.time;
            var first_sources = Game.rooms["W9N9"].find(FIND_SOURCES);
            console.log('Spawning new upgraders: ' + newName);
            if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], newName) == OK) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], newName,
                {memory: {role: 'upgrader' ,source: first_sources[0].id}}); 
                //Memory.spawn = !Memory.spawn;
            }
        }
        
        var harvesters =_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvester:' + harvesters.length);
        
        if(harvesters.length < 3) {
            var newName = 'Harvester' + Game.time; 
            var first_sources = Game.rooms["W9N9"].find(FIND_SOURCES);
            console.log('Spawning new harvesters: ' + newName);
            if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName) == OK) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                {memory: {role: 'harvester', source: first_sources[0].id, droping: false}});
            }
        }
        
        var builders =_.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder:' + builders.length);
        
        if(builders.length < 3) {
            var newName = 'Builder' + Game.time;
            var first_sources = Game.rooms["W9N9"].find(FIND_SOURCES);
            console.log('Spawning new builders: ' + newName);
            if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName) == OK) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
                {memory: {role: 'builder', source: first_sources[0].id}});
            }
        }
    }
}


module.exports = roleCreateCreeps;