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

// const getRoom = (roomName: string): Room => {
//     const room = Game.rooms[roomName];

//     if (room === undefined) {
//       return exit(`Room ${roomName} not found`);
//     }

//     return room;
//   };


  const logger = createLogger('room-manager');

  console.log ("27 Game.time " + Game.time)

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

const rooms = Game.rooms;

export const roomManager = createProcess(



    restartOnTickChange(function* () {
    for (;;) {
        for (let roomName in rooms)
        {


            console.log("Game.time is " + Game.time)
            let room = Game.rooms[roomName];

            const safeModeStatus = room?.controller?.safeMode


            if (room == undefined) {
                continue
            }
            let controllerLevel = room?.controller?.level;
            const source1Link = room.getSource1Link();
            const source2Link = room.getSource2Link();
            const controllerLink= room.getControllerLink(undefined);

            const source1Container = room.getSource1Container()
            const source2Container = room.getSource1Container()
            const firstSpawn = room.getFirstSpawn();


            // const source2Container1 = Game.getObjectById ("62f2e4a57349b1bc0ab9956a" as any) as any;
            // const source2Container2 = Game.getObjectById ("62fc7ce8da37d44cdfcde5ee" as any) as any;



            if (room.name == "E44S3") {

                const  tower1Id  = "62f446749fb8831de0634625" as Id<_HasId>;
                const  tower2Id  = "62fdff99b38ef00b1a9f03b6" as Id<_HasId>;
               // let tower1 = Game.getObjectById(tower1Id) as StructureTower;
                let tower2 = Game.getObjectById(tower2Id) as StructureTower;
             
                // Game.structures[]
                // if (tower1.needsEnergy == undefined) {
                //     tower1.needsEnergy = false;
                // }


            //     if (tower1.store.getFreeCapacity(RESOURCE_ENERGY) >= 200) {
            //         tower1.needsEnergy = true;
            //     }

            //     if (tower1.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            //         tower1.needsEnergy = false;
            //     }

          //      console.log("94 tower1.needsEnergy is " + tower1.needsEnergy)
           //     console.log("94 tower1.needsEnergy is " + room.spawns)


                const Source2_Container_E44S3 = Game.flags.Source2_Container_E44S3;
                // if (source2Container1.store.getUsedCapacity(RESOURCE_ENERGY) >= source2Container2.store.getUsedCapacity(RESOURCE_ENERGY)) {
                //    Source2_Container_E44S3?.setPosition(source2Container1);
                // }
                // else{
                //     Source2_Container_E44S3?.setPosition(source2Container2);
                // }




                firstSpawn.renewCreepsNextToSpawn(1450);

                //////////////////////////////////////////////////////////////////////////////////
                // if all three links exist, transfer energy from source2 link to controller link
                if ((controllerLink && source1Link && source2Link) && controllerLink.store.getFreeCapacity(RESOURCE_ENERGY) >= 200) {

                        if (source2Link.store.getUsedCapacity(RESOURCE_ENERGY)>= 200) {
                            if (controllerLink.store.getFreeCapacity(RESOURCE_ENERGY) >= 200) {
                                source2Link.transferEnergy(controllerLink)
                            }
                        }
                        else if (source2Link.store.getUsedCapacity(RESOURCE_ENERGY)>= 200) {
                            if (source1Link.store.getFreeCapacity(RESOURCE_ENERGY) >= 200) {
                                source2Link.transferEnergy(source1Link)
                            }
                        }

                }

                //////////////////////////////////////////////////////////////////////////////////
                // if only Source 1 and source2 links exist, tranfer energy from source2 link-> source 1 link
                else  if (source1Link && source2Link) {
                  // console.log("source1Link is " + source1Link + " source2Link is " + source2Link)
                    if (source2Link.store.getUsedCapacity(RESOURCE_ENERGY)>= 200) {
                        if (source1Link.store.getFreeCapacity(RESOURCE_ENERGY) >= 200) {
                            source2Link.transferEnergy(source1Link)
                        }
                    }
                }




            }


            if (room != undefined) {
             //   const spawns = room.find(FIND_MY_SPAWNS);
                let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER && s.room.name ==  room!.name) as StructureTower[] ;
                let invaders = room.find(FIND_HOSTILE_CREEPS) as AnyCreep[]
                let maxRampartHits = room.getFirstSpawn().memory.maxRampartHits
                let maxWallHits = room.getFirstSpawn().memory.maxWallHits
                const firstSpawn = room.getFirstSpawn();

                const ramparts = room.getRamparts(maxRampartHits);
                console.log("160 ramparts.length is " + ramparts?.length)

                if (ramparts!.length == 0 && room.storage?.store.getUsedCapacity(RESOURCE_ENERGY)! >= 998000) {
                    maxRampartHits += 10000;
                    firstSpawn.memory.maxRampartHits = maxRampartHits;
                   // return maxRampartHits;
                }

               // console.log("158 maxRampartHits is " + maxRampartHits);
               // console.log("159 maxWallHits is " + maxWallHits);

                let damagedCreeps = room.find (FIND_MY_CREEPS, { filter: s => s.hits < s.hitsMax});

                let repairStructures = room.find (FIND_STRUCTURES, { filter: s => s.hits < s.hitsMax
                     && s.structureType == STRUCTURE_ROAD
                     || s.structureType == STRUCTURE_CONTAINER});


                ////////////////////////////////////////////
                // Priority 1: attack invaders
                if (invaders.length > 0 && safeModeStatus ==  undefined) {
                    for (const tower of towers) {

                        ////////////////////////////////////////////
                        // Priority attack invader that can heal
                        let evilCreepWithHeal = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, { filter: (s) => s.getActiveBodyparts(ATTACK)  && s.getActiveBodyparts(HEAL) && s.owner.username == "invader"});
                        if (evilCreepWithHeal) {
                            tower.attack(evilCreepWithHeal);
                            console.log("**** Invader in room ****")
                        }
                        // else attack
                        else{
                            let invader = invaders[0];
                            if (invader) {
                                tower.attack(invader);
                                console.log("**** Invader in room ****")}
                            }

                        }
                    yield* sleep();
                }

                ////////////////////////////////////////////\
                // Priority 2: heal creeps
                if ((invaders.length == 0 && damagedCreeps.length > 0) ) {
                    for (const tower of towers) {


                        var damagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, { filter: s => s.hits < s.hitsMax});
                            if (damagedCreep != undefined) {
                                tower.heal(damagedCreep);
                            }

                     //   console.log("**** Invader in room ****")
                    }
                    yield* sleep();
                }

                ////////////////////////////////////////////
                // Priority 3: repair structures
                if (invaders.length == 0 && repairStructures.length > 0 )  {
                    for (const tower of towers) {

                        if (tower.store.getUsedCapacity(RESOURCE_ENERGY) <=400 ) {
                            continue;
                        }

                            var damagedStucture = tower.pos.findClosestByRange (FIND_STRUCTURES, { filter: s => s.hits < s.hitsMax
                                && (s.structureType == STRUCTURE_ROAD
                                || s.structureType == STRUCTURE_CONTAINER
                            )});


                            ////////////////////////////////////////////////
                            // check for ramparts
                            if (damagedStucture == undefined) {
                                damagedStucture = tower.pos.findClosestByRange (FIND_STRUCTURES, { filter: s => s.hits < maxRampartHits
                                    && (s.structureType == STRUCTURE_RAMPART)});
                            }

                            ////////////////////////////////////////////////
                            // Repair Walls under 100K
                            if (damagedStucture == undefined) {
                                damagedStucture = tower.pos.findClosestByRange (FIND_STRUCTURES, { filter: s => s.hits < maxWallHits
                                    && (s.structureType == STRUCTURE_WALL)});
                            }


                            if (damagedStucture != undefined) {
                                let towerTargetFlag: Flag | undefined = Game.flags["TowerTarget_" + tower.room.name]
                                towerTargetFlag!.setPosition(damagedStucture)
                                tower.repair(damagedStucture);
                            }

                     //   console.log("**** Invader in room ****")
                    }
                    yield* sleep();
                }

                console.log(room.name)
            }

            // if (controllerLevel == 4) {
            //     if (room!.storage == undefined) {
            //         if (Game.flags["Storage_" + room!.name] != undefined) {

            //         }
            //     }
            // }


        }

         yield* sleep(); // required. Do not remove


    }
  })



);
