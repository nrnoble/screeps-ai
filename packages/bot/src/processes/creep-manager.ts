import { sleep, createProcess } from 'oscore';
import { isDefined, restartOnTickChange } from '../utils';
import {
  getMemoryRef,
  LogLevel,
  recordGlobals,
  resetStats,
  createLogger,
  setLogFilter,
  setLogLevel,
} from '../library';
import { object } from 'lodash';


const myLogger = createLogger("myLogger");


const findContainerWithEnergy = (worker:Creep) =>{
  let container: any
  let  containers = worker.pos.findInRange(FIND_STRUCTURES, 5, {
      filter: s => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0)
  });

  if (containers.length > 0) {
    container = containers[0]
    return container;
  }

  return undefined;

}


///////////////////////////////////////////
// miner
///////////////////////////////////////////
const runMiners = () => {
  const miners = Object.values(Game.creeps).filter(
    (creep) => creep.my && creep.name.startsWith('miner')
  );

  for (const miner of miners) {
   const source2Link = miner.room.getSource2Link();
   const source1Link = miner.room.getSource1Link();
   const spawn = miner.room.getFirstSpawn();
   if (miner.ticksToLive! < 50 && miner.name.startsWith("minerSource1") == true && miner.memory.spawnNewMinerTrigger == undefined) {
      miner.memory.spawnNewMinerTrigger = "triggered"
      spawn.memory.spawnSource1Miner = true;
    }
    else  if (miner.ticksToLive! < 70 && miner.name.startsWith("minerSource2") == true  && miner.memory.spawnNewMinerTrigger == undefined) {
      miner.memory.spawnNewMinerTrigger = "triggered";
      spawn.memory.spawnSource2Miner = true;
    }




   // miner.say("m")

   // console.log("miner.pos is " + miner.pos)
    if (!isDefined(miner.memory.slot)) {
     // miner.suicide();
      continue;
    }

    const targPos = miner.memory.slot;
    const minerPos = new RoomPosition(targPos[0],targPos[1],targPos[2])
    if (miner.pos.isEqualTo(minerPos) == false) {
      miner.moveTo(minerPos, { visualizePathStyle: { lineStyle: 'dashed' } });
    }
    const [source] = miner.pos.findInRange(FIND_SOURCES, 1);
    if (source === undefined) {
      continue;
    }
  //  console.log("(61 source.energy is " + (source.energy));

  ///////////////////////////////////////////////////////////////////////
  // Handler for when source is emperty waiting to be reset with energy
    if (source.energy == 0) {
   //   console.log("(63 source.energy is " + (source.energy));

      const pickupEnergy = () => {
        const energyDrops = miner.room.find(FIND_DROPPED_RESOURCES, {
          filter: ({ resourceType }) => resourceType === RESOURCE_ENERGY,
        });
        const resource = _.max(energyDrops, 'amount');
        if (!resource) {
          return;
        }
        miner.pickup(resource);
      };

      if (source1Link != undefined) {
     //   myLogger.info("source1Link  is" );
        if (miner.pos.isNearTo(source1Link!) == true) {
          if (source1Link.store.getUsedCapacity(RESOURCE_ENERGY) >= 50) {
            if (miner.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
              miner.withdraw(source1Link, RESOURCE_ENERGY)
            }

        //    continue;

          }
        }

      }


      // let container = miner.findContainerInRange(1) as StructureContainer;
      // if (container != undefined) {
      //   if (container.store.getUsedCapacity (RESOURCE_ENERGY) > 0) {
      //     if (miner.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      //       miner.withdraw(container,RESOURCE_ENERGY);
      //     }
      //   }

      //   if (miner.room.storage !=undefined) {
      //     if (miner.pos.isNearTo(miner.room.storage!)) {
      //       miner.transfer(miner.room.storage!,RESOURCE_ENERGY)
      //     }
      //   }

      // }

      pickupEnergy()
      const source2Link = miner.room.getSource2Link(undefined);
      miner.transfer(source2Link!,RESOURCE_ENERGY);

     // continue;

    }


    ////////////////////////////////////////////////////////
    // if miner is near Source1 link, then Withdraw energy
    if (source1Link != undefined) {
      if (miner.pos.isNearTo(source1Link!) == true) {
        if (source1Link.store.getUsedCapacity(RESOURCE_ENERGY) >= 50) {
        console.log("withdrawing from source1Link is " + source1Link );

          if (miner.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            miner.withdraw(source1Link, RESOURCE_ENERGY)
            //  continue;
          }
        }
      }

    }

    ////////////////////////////////////////////////////////////////////////////
    // if miner is near Source2 link, then tranfer all energy to Source2 Link
      if (source2Link != undefined) {
   //     myLogger.info("source2Link  is" );
        if (miner.pos.isNearTo(source2Link!) == true && (miner.store.getUsedCapacity(RESOURCE_ENERGY) > 0)) {
          if (source2Link.store.getFreeCapacity(RESOURCE_ENERGY) >= 0) {
            miner.transfer(source2Link, RESOURCE_ENERGY)
          //  continue;
          }
        }
      }


    miner.harvest(source);



    // }
    // if (miner.store.getFreeCapacity() >= 17 || miner.store.getFreeCapacity()) {
    //   console.log("(********* 88 miner name is " + miner.name);
    //   continue;
    // }

   // console.log("(********* 93 miner name is " + miner.name);

    const site = miner.pos.findInRange(FIND_CONSTRUCTION_SITES, 1)[0];
    if (site) {
      miner.build(site);
      continue;
    }

    // #HACK. filtering out container ids can be removed once they are empty.
    const container = miner.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure): structure is StructureContainer =>
        structure.structureType === STRUCTURE_CONTAINER && structure.id != "62fc7dd889db98c32fcadc27" && structure.id != "62f6c9888ed83f1b02aadf32",
    });

 //   console.log("(********* 93 miner name is " + miner.name + container);


 //   let spawn = Game.getObjectById("62f211ab992a4c40a9e2a1d7" as any) as StructureSpawn
 //   console.log("(********* 104 miner name is " + miner.name);



  if (miner.pos.isNearTo(container!) && container!.id != "62fc7dd889db98c32fcadc27" && container!.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
    if (container!.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      console.log("187 transfer to container.id is " + container!.id)
      miner.transfer(container!, RESOURCE_ENERGY);
    }
  }




  else if (miner.room.storage
    && container
    && miner.pos.isNearTo(miner.room.storage)) {
      // if (container && miner.pos.isNearTo(miner.room.storage)) {
      //   //console.log ("miner.transfer(miner.room.storage, RESOURCE_ENERGY)  is " + Game.time)
      //   miner.transfer(miner.room.storage, RESOURCE_ENERGY);
      // }


        if (miner.room.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
          console.log ("215 miner.transfer(miner.room.storage, RESOURCE_ENERGY)  is " + Game.time)
          miner.transfer(miner.room.storage, RESOURCE_ENERGY);
        }
        else if(miner.room.terminal && miner.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
          miner.transfer(miner.room.terminal, RESOURCE_ENERGY);
        }

  else if (source2Link != undefined)
     if (miner.pos.isNearTo(source2Link) == true) {
      if (source2Link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
       // console.log("203 transfer to source2Link.id is " + source2Link!.id)

        miner.transfer(source2Link!, RESOURCE_ENERGY);
      }
    }
  }
  else{
      if (container && miner.pos.isNearTo(container)) {
        miner.transfer(container, RESOURCE_ENERGY);
        console.log("212 transfer to container.id is " + container!.id)

      console.log("(********* 128 miner name is " + miner.name);

      }

      if (source.energy == 0) {
        console.log("(63 source.energy is " + (source.energy));

        const pickupEnergy = () => {
          const energyDrops = miner.room.find(FIND_DROPPED_RESOURCES, {
            filter: ({ resourceType }) => resourceType === RESOURCE_ENERGY,
          });
          const resource = _.max(energyDrops, 'amount');
          if (!resource) {
            return;
          }
        };


        pickupEnergy()
        continue;

      }
    }


  }
};


///////////////////////////////////////////
// attacker
///////////////////////////////////////////
const runAttackers = () => {
  const attackers = Object.values(Game.creeps).filter(
    (creep) => creep.my && creep.name.startsWith('attacker')
  );

  for (const attacker of attackers) {
    const enemy = attacker.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (enemy) {
      attacker.moveTo(enemy, { range: 1 });
      attacker.attack(enemy);
    }
  }
};


///////////////////////////////////////////
// worker
///////////////////////////////////////////
const runWorkers = () => {
  const workers = Object.values(Game.creeps).filter(
    (creep) => creep.my && creep.name.startsWith('worker')
  );


  let target

  for (const worker of workers) {
    const maxRampartsHits = worker.room.getFirstSpawn().memory.maxRampartsHits;
    const maxWallHits = worker.room.getFirstSpawn().memory.maxWallHits;
    // const pos = new RoomPosition (14,6,"E44S3")
    // if (worker.pos.isNearTo(pos) == false) {
    //   worker.moveTo(pos);
    //   continue;
    // }


    worker.say ("w");
    const room = worker.room;
    let structures = undefined;
   // const E44S3 = Game.rooms["E44S3"]!
    // const E44S3 = Game.rooms.E44S3!
    // worker.moveTo(E44S3.storage!);
    // continue;
  //  let source1 = worker.room.Source1;
  //  let getSource2Link = worker.room.getSource2Link();
  //  console.log ("137 getSource2Link.id is " + getSource2Link!.id)

    //////////////////////////////////////////////////
    // Get energy if worker is empty
    //////////////////////////////////////////////////





    if (worker.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {

     // let container1 = Game.getObjectById("62fc7dd889db98c32fcadc27" as any)as StructureContainer;
     // let container2 = Game.getObjectById("62f6c9888ed83f1b02aadf32" as any)as StructureContainer;
      // if (container1.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
      //   worker.moveTo(container1)
      //   worker.withdraw(container1,RESOURCE_ENERGY);
      //   continue
      // }
      // if(container2.store.getUsedCapacity(RESOURCE_ENERGY) >0){
      //   worker.moveTo(container2)
      //   worker.withdraw(container2,RESOURCE_ENERGY);
      //   continue

      // }



      if (worker.room.storage != undefined && worker.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) >=100) {
        if (worker.pos.isNearTo(worker.room.storage) == false) {
          worker.moveTo(worker.room.storage)
          continue;
        }
        else{
          //    if (container1.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
          //   worker.withdraw(container1,RESOURCE_ENERGY);
          // }
          // else
          // if(container2.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
          //     worker.withdraw(container2,RESOURCE_ENERGY);}
          // else{
            worker.withdraw(worker.room.storage,RESOURCE_ENERGY);


          continue;
        }
      }
    }

    ////////////////////////////////////////////////
    // build structures
    ////////////////////////////////////////////////
    target = worker.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES) as any;

    // console.log("!xxxxxx");

    ////////////////////////////////////////////////
    // Priority 3: repair ramparts
    ////////////////////////////////////////////////
    if (target == undefined) {
      target = worker.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (s) =>
          s.hits < maxRampartsHits && s.structureType && s.structureType ==STRUCTURE_RAMPART,
      })  as any
    //  .sort((a, b) => a.hits - b.hits) ;
    // console.log("Worker Target is " + target)

    }

    ////////////////////////////////////////////////
    // repair walls
    ////////////////////////////////////////////////
    if (target == undefined) {
      target = worker.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) =>
          s.hits < maxWallHits && s.structureType && s.structureType ==STRUCTURE_WALL,
      })
   //   console.log("161 Worker Target is " + target)

    //  .sort((a, b) => a.hits - b.hits);


    }

 //   console.log("175 target is " + target);

    ////////////////////////////////////////////////
    //repair damage containers and roads
    ////////////////////////////////////////////////
    if (target == undefined) {
      structures = room.find(FIND_STRUCTURES, {
        filter: (s) =>
          s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL  && s.structureType !==STRUCTURE_RAMPART,
      })
   //   .sort((a, b) => a.hits - b.hits);

      if (structures.length >0) {
        target! = structures[0];

      }
    //  console.log("Worker Target is " + target)

    }

 //   console.log("worker.room.storage != undefined " + worker.room.storage != undefined)


    const pickupEnergy = () => {
      const energyDrops = worker.room.find(FIND_DROPPED_RESOURCES, {
        filter: ({ resourceType }) => resourceType === RESOURCE_ENERGY,
      });
      const resource = _.max(energyDrops, 'amount');
      if (!resource) {
        return;
      }
      worker.moveTo(resource);
      worker.pickup(resource);
    };




  //   console.log("213 target is " + target);

    if (target == undefined) {
      let container = findContainerWithEnergy(worker);
   //  console.log("216 container is" + container);

      if (worker.store.getFreeCapacity()) {

       let  containers = worker.pos.findInRange(FIND_STRUCTURES, 5, {
            filter: s => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0)
        });


        if (containers.length > 0) {
          //var container: any;
         let container: any = containers[0]

         if (worker.pos.isNearTo(container) == false) {
            worker.moveTo(container.pos)
          }
          else{
            worker.withdraw(container,RESOURCE_ENERGY)
          }
        }

      //  console.log("1picking up energy is");

      //  pickupEnergy();
      }
      continue;
    }

    if (
      (worker.store.getUsedCapacity() && worker.pos.inRangeTo(target, 25)) ||
      !worker.store.getFreeCapacity()
    ) {
      worker.say("T");
    //  console.log("Worker Target is " + target)
//      let status = worker.moveTo(target, { range: 10 });
      let status = worker.moveTo(target);
     // myLogger.info("test")

      //  console.log(status);
      if (status != 0) {
       // myLogger.info(status.toLocaleString())
       // console.log(status);
      }
      if (target instanceof ConstructionSite) {
        let buildStatus = worker.build(target);
        if (buildStatus != 0) {
          console.log(buildStatus);
        }
      } else {
        worker.repair(target);
      }
    } else {
     // console.log("2picking up energy is");
    //  pickupEnergy();

    }
  }


};

///////////////////////////////////////////
// upgrader
///////////////////////////////////////////

const runUpgraders = () => {
  const upgraders = Object.values(Game.creeps).filter(
    (creep) => creep.my && creep.name.startsWith('upgrader')
  );

  for (const upgrader of upgraders) {
    const controller = upgrader.room.controller;
    if (!controller) {
      // TODO
      // this.logger.warn('upgrader in room with no controller', upgrader);
      upgrader.suicide();
      continue;
    }
    if (upgrader.ticksToLive! < 10 && upgrader.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
      upgrader.suicide();
      continue;
    }

    if (upgrader.ticksToLive! < 90 && upgrader.name.startsWith("upgrader") == true && upgrader.memory.spawnNewUpgraderTrigger == undefined) {
      let firstSpawn = upgrader.room.getFirstSpawn();
      upgrader.memory.spawnNewUpgraderTrigger = "triggered"
      firstSpawn.memory.spawnUpgrader = true;
    }


    if (
      (upgrader.store.getUsedCapacity() &&
        upgrader.pos.inRangeTo(controller, 3)) ||
      !upgrader.store.getFreeCapacity()
    ) {
      upgrader.moveTo(controller, { range: 3 });
      upgrader.upgradeController(controller);
    } else {

      let nearestContainer = upgrader.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY)>= 100})
      let controllerLink = upgrader.room.getControllerLink(undefined);

      nearestContainer = null

      const energyDrops = upgrader.room.find(FIND_DROPPED_RESOURCES, {
        filter: ({ resourceType }) => resourceType === RESOURCE_ENERGY,
      });
      const droppedEnergy = _.max(energyDrops, 'amount');


      if (controllerLink != undefined) {
        upgrader.moveTo(controllerLink);
        if (upgrader.pos.isNearTo(droppedEnergy)) {
           upgrader.pickup(droppedEnergy);
         }
       else{
         if (upgrader.pos.isNearTo(controllerLink))
           upgrader.withdraw(controllerLink,RESOURCE_ENERGY);
         }
     }
     else if (nearestContainer != undefined) {
         upgrader.moveTo(nearestContainer);
         if (upgrader.pos.isNearTo(droppedEnergy)) {
            upgrader.pickup(droppedEnergy);
          }
        else if (upgrader.pos.isNearTo(nearestContainer)){
            upgrader.withdraw(nearestContainer,RESOURCE_ENERGY);
          }
          else{
            // do nothing
            continue;
          }
      }

      // else no container has energy, got to dropped resource.
      else{


        upgrader.moveTo(droppedEnergy);
        upgrader.pickup(droppedEnergy);
      }
    }
  }
};
///////////////////////////////////////////
// Hauler
///////////////////////////////////////////
const runHaulers = () => {
  const haulers = Object.values(Game.creeps).filter(
    (creep) => creep.my && creep.name.startsWith('hauler-')
  );

 const getTarget = (workerCreep:Creep) =>{

  let spawn = workerCreep.pos.findClosestByPath(FIND_MY_SPAWNS, {filter: (s) => s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (spawn !=  undefined) {
      return spawn;
    }

    let extention = workerCreep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (extention !=  undefined) {
      return extention;
    }

    let tower = workerCreep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (tower !=  undefined) {
      return tower;
    }

    // let container = workerCreep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    // if (container !=  undefined) {
    //   return container;
    // }


    return undefined;
 }



  for (const hauler of haulers) {
    if (hauler.store.getFreeCapacity() < hauler.store.getCapacity(RESOURCE_ENERGY)) {
       let  target = hauler.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure): structure is StructureSpawn
          | StructureContainer =>
            (
              structure.structureType === STRUCTURE_TOWER
                  && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 300
              )
        });




      if (!target) {
      target = hauler.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure): structure is StructureSpawn
        | StructureContainer =>
          (
            //structure.structureType === STRUCTURE_CONTAINER
            //structure.structureType === STRUCTURE_SPAWN
            structure.structureType === STRUCTURE_EXTENSION
            // ||(structure.structureType === STRUCTURE_TOWER
            //     && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 150)
             )
            && structure.id != "62f2e2d8ddeca86442b57bf7"
            && structure.id != "62f2e4a57349b1bc0ab9956a"
            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });
    }

    if (!target) {
      target = hauler.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure): AnyStructure | AnyOwnedStructure | any
        | StructureContainer =>
          (
            structure.structureType === STRUCTURE_SPAWN
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 0
            )
      });
    }

    // if (!target) {

    //   // damagedStucture = tower.pos.findClosestByRange (FIND_STRUCTURES, { filter: s => s.hits < 100000
    //   //   && (s.structureType == STRUCTURE_WALL)});
    //   target = hauler.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: s =>  s.structureType === STRUCTURE_TOWER});

    //   //   (structure): structure is StructureSpawn
    //   //   | StructureContainer =>
    //   //     (
    //   //       structure.structureType === STRUCTURE_TOWER
    //   //           && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 0
    //   //       )
    //   // });

    // }



      if (!target) {
        continue;
      }
      hauler.moveTo(target);
      hauler.transfer(target, RESOURCE_ENERGY);
      continue;
    } else {

      //hauler.pos.findClosestByRange(FIND_DROPPED_RESOURCES)
      const droppedResources = hauler.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {
        filter: ({ resourceType, amount}) => resourceType === RESOURCE_ENERGY && amount >= hauler.store.getCapacity(RESOURCE_ENERGY),
      }) as Resource<RESOURCE_ENERGY>[];

      let resource = undefined;
      if (droppedResources.length > 0) {
        resource =  droppedResources[0];
      }



     // const resource = _.max(energyDrops, 'amount');
      if (resource) {
        hauler.moveTo(resource!);
        hauler.pickup(resource!);

      }
      else{

        let refuelTarget: any
      //  let container1 = Game.getObjectById("62fc7dd889db98c32fcadc27" as any)as StructureContainer;
       // let container2 = Game.getObjectById("62f6c9888ed83f1b02aadf32" as any)as StructureContainer;
        // if (container1.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        //   hauler.moveTo(container1)
        //   hauler.withdraw(container1,RESOURCE_ENERGY);
        //   continue
        // }
        // if(container2.store.getUsedCapacity(RESOURCE_ENERGY)){
        //   hauler.moveTo(container2)
        //   hauler.withdraw(container2,RESOURCE_ENERGY);
        //   continue

        // }



       if (hauler.room.storage) {
          refuelTarget = hauler.room.storage
        }
        else{
          refuelTarget = hauler.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getCapacity(RESOURCE_ENERGY) >= hauler.store.getCapacity(RESOURCE_ENERGY) && s.id != "62f30980da4be748b0fcf7ce",
          }) as Structure<STRUCTURE_CONTAINER>;
        }

        const energyDrops = hauler.room.find(FIND_DROPPED_RESOURCES, {
          filter: ({ resourceType }) => resourceType === RESOURCE_ENERGY,
        });
        const droppedEnergy = _.max(energyDrops, 'amount');
        if (hauler.pos.isNearTo(droppedEnergy)) {
          hauler.pickup(droppedEnergy);
        }

        if (refuelTarget != undefined) {
          if (refuelTarget.store.getUsedCapacity(RESOURCE_ENERGY) < 200) {
            let container = Game.getObjectById("62f2e4a57349b1bc0ab9956a" as any) as any// as Structure<StructureContainer>
            if (container != undefined) {
              if (container.store.getUsedCapacity(RESOURCE_ENERGY) > 300) {
                refuelTarget = container;
              }
            }
        }
        }


        hauler.moveTo(refuelTarget);
     //   console.log("Refuel Target is " + refuelTarget)
        hauler.withdraw(refuelTarget, RESOURCE_ENERGY);

      }
    }
  }
};

const runHaulers2 = () => {
  const hauler2s = Object.values(Game.creeps).filter(
    (creep) => creep.my && creep.name.startsWith('hauler2')
  );
 const getTarget = (workerCreep:Creep) =>{

  let spawn = workerCreep.pos.findClosestByPath(FIND_MY_SPAWNS, {filter: (s) => s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (spawn !=  undefined) {
      return spawn;
    }

    let extention = workerCreep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (extention !=  undefined) {
      return extention;
    }

    let tower = workerCreep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (tower !=  undefined) {
      return tower;
    }

    let container = workerCreep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) >0})
    if (container !=  undefined) {
      return container;
    }


    return undefined;
 }



  for (const hauler2 of hauler2s) {
    if (hauler2.store.getFreeCapacity() < hauler2.store.getCapacity(RESOURCE_ENERGY)) {

      hauler2.say("2")

      const target = hauler2.room.storage

      // const target = hauler.pos.findClosestByRange(FIND_STRUCTURES, {
      //   filter: (structure): structure is StructureSpawn
      //   | StructureContainer =>
      //     (structure.structureType === STRUCTURE_CONTAINER
      //       ||structure.structureType === STRUCTURE_SPAWN
      //       ||structure.structureType === STRUCTURE_EXTENSION
      //       ||structure.structureType === STRUCTURE_TOWER
      //       )
      //       && structure.id != "62f2e2d8ddeca86442b57bf7"
      //       && structure.id != "62f2e4a57349b1bc0ab9956a"
      //       && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 20
      // });

      if (!target) {
        continue;
      }



      hauler2.moveTo(target);
      hauler2.transfer(target, RESOURCE_ENERGY);
      continue;
    }
    else {

      const resourceLocation =  Game.flags.Source2_Container_E44S3

     // hauler.pos.findClosestByRange(FIND_DROPPED_RESOURCES)
      const droppedResources = resourceLocation!.pos.findInRange(FIND_DROPPED_RESOURCES, 5, {
        filter: ({ resourceType, amount}) => resourceType === RESOURCE_ENERGY && amount >= hauler2.store.getCapacity(RESOURCE_ENERGY),
      }) as Resource<RESOURCE_ENERGY>[];

      let resource = undefined;
      if (droppedResources.length > 0) {
        resource =  droppedResources[0];
      }

     if (resource) {
        hauler2.moveTo(resource!);
        hauler2.pickup(resource!);

      }

      if(hauler2.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {

        let refuelTarget: any

        refuelTarget = resourceLocation!.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store.getCapacity(RESOURCE_ENERGY) >= hauler2.store.getCapacity(RESOURCE_ENERGY) && s.id != "62f30980da4be748b0fcf7ce",
          }) as Structure<STRUCTURE_CONTAINER>;


        const energyDrops = hauler2.room.find(FIND_DROPPED_RESOURCES, {
          filter: ({ resourceType }) => resourceType === RESOURCE_ENERGY,
        });
        const droppedEnergy = _.max(energyDrops, 'amount');
        if (hauler2.pos.isNearTo(droppedEnergy)) {
          hauler2.pickup(droppedEnergy);
        }

        if (refuelTarget != undefined) {
          if (refuelTarget.store.getUsedCapacity(RESOURCE_ENERGY) < 200) {
            let container = Game.getObjectById("62f2e4a57349b1bc0ab9956a" as any) as any// as Structure<StructureContainer>
            if (container != undefined) {
              if (container.store.getUsedCapacity(RESOURCE_ENERGY) > 300) {
                refuelTarget = container;
              }
            }
        }
        }


        hauler2.moveTo(refuelTarget);
        // console.log("Refuel Target is " + refuelTarget)
        hauler2.withdraw(refuelTarget, RESOURCE_ENERGY);

      }
    }
  }
};



export const creepManager = createProcess(
  restartOnTickChange(function* () {
    for (;;) {
      runAttackers();
      yield;
      runMiners();
      yield;
      runHaulers2();
      yield;
      runHaulers();
      yield;
      runUpgraders();
      yield;
      runWorkers();
      yield* sleep();
    }
  })
);
