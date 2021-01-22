/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.autospawn');
 * mod.thing == 'a thing'; // true
 */
 
var autoSpawn = {
    run: function(){
        /*var upgraders =_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader:' + upgraders.length);
        
        if(upgraders.length < 3) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgraders: ' + newName);
            if(Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName) == OK) {
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], newName,
                {memory: {role: 'upgrader' ,source: Memory.spawn}}); 
                Memory.spawn = !Memory.spawn;
            }
        }
        
        var harvesters =_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvester:' + harvesters.length);
        
        if(harvesters.length < 4) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvesters: ' + newName);
            if(Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, CARRY, MOVE], newName) == OK) {
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName,
                {memory: {role: 'harvester', source: Memory.spawn}});
                Memory.spawn = !Memory.spawn;
            }
        }
        
        var builders =_.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder:' + builders.length);
        
        if(builders.length < 3) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builders: ' + newName);
            if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], newName) == OK) {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], newName,
                {memory: {role: 'builder', source: Memory.spawn}});
                Memory.spawn = !Memory.spawn;
            }
        }*/
        
        var R1energyCapacity = Game.rooms.W9N9.energyCapacityAvailable;
        var R1energyAvailable = Game.rooms.W9N9.energyAvailable;
        console.log("Room 1 energy: "+R1energyAvailable+" out of "+R1energyCapacity+" Max");
        
        
    }
}


module.exports = autoSpawn;