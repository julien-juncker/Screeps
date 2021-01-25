/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('energy.energyController');
 * mod.thing == 'a thing'; // true
 */
 
function EnergyFactory() {
    this.controlEnergy = function (curr_room) {
        var storageTransferer =_.filter(Game.creeps, (creep) => creep.memory.role == 'storageTransferer');
        
        if(curr_room.energyAvailable < curr_room.memory.params.energyThreshold || curr_room.memory.params.isTransferEnergy) {
            curr_room.memory.params.isTransferEnergy = true;
            
            if(storageTransferer.length == 0) {
                var harvesters =_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                harvesters[0].memory.role = "storageTransferer";
            }
            
        }
        //console.log(curr_room.energyCapacityAvailable);
        if(curr_room.energyAvailable == curr_room.energyCapacityAvailable && curr_room.memory.params.isTransferEnergy) {
            curr_room.memory.params.isTransferEnergy = false;
            storageTransferer[0].memory.role = "harvester";
        }
    }
    
    this.controlLink = function() {
        const linkFrom = Game.getObjectById("cdef425685ec073");
        const linkTo = Game.getObjectById("706c3788d67b5e6");
        linkFrom.transferEnergy(linkTo);
    }
}

var energyController = {
    run: function(curr_room) {
        var energyController = new EnergyFactory();
        
        // Activate when you unlock link structure
        if(curr_room.memory.params.roomController >= 5) {
            energyController.controlLink();
        }

        //energyController.controlEnergy(curr_room);
    }
}

module.exports = energyController;