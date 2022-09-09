/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
//const { uniq, truncate } = require('lodash');
//var util = require('Util');

interface Creep {
    runTask: (task: any) => any;
    findNearestLink: (range: number) => AnyOwnedStructure | undefined;
    findNearestSpawn: (range: any) => AnyOwnedStructure | undefined;
    findNearestSource: (range: any) => Source | undefined;
    pause: (pauseState: any, message: any) => boolean | undefined;
    pickupResources: (range: any) => void;
    repairRoad: () => void;
    energy: () => number;
    findNearestStructureByType: (spawnOrCreep: any, structureType: any, range: any) => any;
    renewCheck: (ticksToLive: number) => Boolean | undefined;
    getRenewed: (renewAtTick: any, renewTicks: any, spawn: any, forceRenew: any) => boolean | undefined;
   // moveTo(closestSpawn: any);
    nearestLinkToController: (range: any) => void;
    roomPosition: (x: any, y: any) => RoomPosition;
    parkIt: () => false | undefined;
    goto: (pos: any) => boolean;
    gotoFlag: () => void;
    travelNearTo: (pos: any) => boolean | undefined;
    myTravelTo: (pos: any, options: any) => any;
    gotoXY: (x: any, y: any) => boolean;
    forceMove: (reservedlocation: any, moveDirection: DirectionConstant) => 0 | -1 | -4 | undefined;
    getConstructionSiteInRange: (range: any) => ConstructionSite<BuildableStructureConstant> | undefined;
    transferEnergyToStorage: () => ScreepsReturnCode | undefined;
    transferEnergyToTerminal: () => ScreepsReturnCode | undefined;
    getContainerUnderCreep: () => null | undefined;
    getContainerUnderMiner: (creep: any) => any;
    stack: () => string | undefined;
    getBuildTarget: () => ConstructionSite<BuildableStructureConstant> | null | undefined;
    getNearestEmptyExtension: () => AnyStructure | null | undefined;
    getNearestRoadTarget: () => AnyStructure | null | undefined;
    findContainersInRange: (range: any) => AnyStructure[];
    findContainerInRange: (range: any) => any;
    lineNumber: () => String | undefined;
    myTargetRoom: (targetRoomName: any) => Room | undefined;
    targetRoom: (targetRoomName?: any) => Room | undefined;
    retreat: (retreatFlagName: any) => boolean | null | undefined;
    myRetreat: (retreatFlagName: any) => any;
    activeSafeMode: () => void;
    doSomethimg: (someStr: any) => void;
    structureHasStore: (structureObj: any) => boolean;
    init: () => void;
    getEnergyFromStore: (storeObjectOrId: any, minEnergyInStore: any) => any;
  //  travelTo(storeStructure: any);
    debug: (textColor: any, fileName: any, lineNumber: any, debugText: any) => void;
    storage: () => StructureStorage | undefined;
    terminal: () => StructureTerminal | undefined;
    getObjectAtCreepPos: (myStructureType: any) => any;
    getObjectAtCreepPos2: (myStructureType: any) => void;
    findConstructionSite: (range: any) => ConstructionSite<BuildableStructureConstant> | undefined;
    findNearestConstructionSiteId: (range: any) => any;
    repairNearByStructures: (range: any) => -1 | undefined;


 //   roads: Poly;

    // structure(
    //   x: number,
    //   y: number,
    //   type: StructureConstant,
    //   opts?: PolyStyle
    // ): void;

    // connectRoads(opts?: LineStyle): RoomVisual;
    // speech(text: string, x: number, y: number, opts?: SpeechStyle): RoomVisual;
    // animatedPosition(x: number, y: number, opts?: AnimatedStyle): RoomVisual;
    // test(): RoomVisual;
  }

//module.exports = function () {





    var fileName = "creep Proto ";
    var debugRoomName = "E27S51";
    var debugColor = "Red";

     // task returns true if running, false if completed.
    Creep.prototype.runTask = function(task: any): any{
        if (this.memory.runTask == true) {
        //    console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] this.memory.runTask  is ' + this.memory.runTask +' </>');

            var taskStatus = task(this)
            if (taskStatus == true) {
                return true;
            }


            this.memory.runTask = false
            return false
        }

    }

    // Creep.prototype.activeSafeMode = function(){
    //     try {
    //             // this.say("Invaders");


    //             // let invaders = invadedRoom.find(FIND_HOSTILE_CREEPS);
    //             // let invaderCount = invaders.length
    //             let numberOfInvaders =0;
    //             var invaders = this.room.find(FIND_HOSTILE_CREEPS);
    //             if (invaders.length > 0) {
    //                 numberOfInvaders = invaders.length
    //             }
    //             //  console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] creep hits is ' + this.hits+ '/' + this.hitsMax + ' </>');



    //                 if (numberOfInvaders > 0) {

    //                 //    this.say("Invader " + numberOfInvaders);
    //                 }


    //                 if (this.hits < this.hitsMax) {
    //                 if (Memory[this.room.name].savemodeActivationTime == undefined) {
    //                         Memory[this.room.name].savemodeActivationTime = Game.time;
    //                     }
    //                     console.log('<font color = "Red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] numberOfInvaders  is ' + numberOfInvaders +' </>');
    //                     this.room.controller.activateSafeMode();
    //                     console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] WARNING SAFE MODE HAS BEEN ACTIVED </>');
    //                 }

    //     } catch (error) {
    //         console.log('<font color = "Red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] trapped error  is ' + error +' </>');

    //     }
    // }


    Creep.prototype.doSomethimg = function(someStr){
        this.say (someStr);
    }


    Creep.prototype.structureHasStore = function (structureObj){

        var storeStructure = undefined;
        if (structureObj["store"] == undefined ) {

            return false;
        }

        if (structureObj["store"]) {

            return true;
        }
        return false
    }


    // Creep.prototype.init = function (){
    //     if (this.memory.renewSpawnName == undefined) {
    //         this.memory.renewSpawnName = this.room.firstSpawn.name;
    //     }

    //     if (this.memory.renew == undefined) {
    //         this.memory.renew = false
    //     }

    //     if (this.memory.numberOfWorkParts == undefined) {
    //         this.memory.numberOfWorkParts = this.getActiveBodyparts(WORK)
    //     }

    // }



    ////////////////////////////////////////////////////////////
    // pass object with a store or pass and ObjectId
    ////////////////////////////////////////////////////////////
    Creep.prototype.getEnergyFromStore = function (storeObjectOrId,minEnergyInStore){

        if (minEnergyInStore == undefined) {
            minEnergyInStore = 50;
        }

        var storeStructure = storeObjectOrId;
        if (this.structureHasStore(storeObjectOrId) == false) {
       // console.log('<font color = "greem">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] storeObjectOrId is ' + storeObjectOrId +'</>');

            storeStructure = Game.getObjectById(storeObjectOrId)
           // if (storeStructure == undefined || this.structureHasStore == false) {
       if (storeStructure == undefined) {
                return undefined;
            }
        }

      //  console.log('<font color = "greem">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] storeStructure is ' + storeStructure +'</>');

        if (storeStructure != undefined && this.structureHasStore(storeStructure) == true) {
            if (storeStructure.store[RESOURCE_ENERGY] >= minEnergyInStore && this.store.energy < this.store.getCapacity()) {
                if (this.pos.isNearTo(storeStructure) == false) {
                   var travelStatus = this.moveByPath(storeStructure)
                    return travelStatus;
                }
                var withDrawStatus = this.withdraw(storeStructure,RESOURCE_ENERGY);
                return withDrawStatus;

            }
        }

        return undefined;

    }



    Creep.prototype.debug = function (textColor, fileName, lineNumber, debugText) {
        console.log('<font color = "' + textColor + '">[' + fileName + 'line:' + lineNumber + '] ' + debugText + '</>');
    }
    //${command:workbench.action.files.saveAll}
    // function Unit() {
    //     this._data; // just temp value
    // }
    // Unit.prototype = {
    //     get accreation() {
    //         return this._data;
    //     },
    //     set accreation(value) {
    //         this._data = value
    //     },
    // }

    // Creep.prototype.defineProperty(Creep, 'property1', {
    //     value: 42,
    //     writable: false
    // });



    // Creep.prototype.controller = Creep.room.controller;


    // Creep.prototype = {
    //     get controller() {
    //         return this.room.controller;
    //     }
    // }


    // Creep.prototype = {
    //     get accreation() {
    //         return this._data;
    //     },
    //     set accreation(value) {
    //         this._data = value
    //     },
    // }

    // obj.__defineSetter__(prop, fun)
    // Creep.__defineSetter__('value', function (val) {

    //     // this.value = "setter Test";
    //     this.value++;
    //     console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] this.value is ' + this.value + '</>');

    // });

    // Object.defineProperty(Creep, 'valuey', {
    //     set: function (val) {
    //         this.anotherValue = val + 1;
    //         this.valuey = val + 10;
    //         console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] this.valuey is ' + this.valuey + '</>');
    //     }
    // });




    // var o = {};
    // o.__defineSetter__('value', function (val) {
    //     this.anotherValue = 13;
    //     this.value = val;
    // });


    Creep.prototype.storage = function () {
        if (this.room.storage == undefined) {
            return undefined;
        }
        return this.room.storage;
    }


    Creep.prototype.terminal = function () {
        if (this.room.terminal == undefined) {
            return undefined
        }
        return this.room.terminal;
    }


    //   var containerUnderMiner = creep.room.lookAt(creepCurrentPos)[0];
    Creep.prototype.getObjectAtCreepPos = function (myStructureType) {
        const look = this.room.lookAt(this.pos);
        let returnValue = undefined;
        look.forEach(function (lookObject) {
            if (lookObject[LOOK_STRUCTURES] == undefined) {
                return;
            }

            //   console.log('<font color = "green">[' + fileName + 'line:' + util.LineNumber() + '] lookObject[LOOK_STRUCTURES]  is ' + lookObject[LOOK_STRUCTURES]  +" structureType:"+ lookObject[LOOK_STRUCTURES].structureType +'</>');

            //console.log('<font color = "green">[' + fileName + 'line:' + util.LineNumber() + '] lookObject[LOOK_STRUCTURES]  is ' + JSON.stringify(lookObject[LOOK_STRUCTURES]) + '</>');

            if (lookObject != undefined && lookObject.type == LOOK_STRUCTURES &&
                lookObject[LOOK_STRUCTURES]!.structureType == myStructureType) {
                // console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] debug  is ' + lookObject[LOOK_STRUCTURES].structureType  +'</>');
                returnValue = lookObject[LOOK_STRUCTURES];

            }
        });

        return returnValue;

    }

    Creep.prototype.getObjectAtCreepPos2 = function (myStructureType) {
        const look = this.room.lookAt(this.pos);

        return look.forEach(function (value: any, index, _look) {
            if (value.structureType === myStructureType) {
                return value;
            }

            // return value;


        });

        //   return;


    }

    Creep.prototype.findConstructionSite = function (range) {
        const constructionTargets = this.pos.findInRange(FIND_CONSTRUCTION_SITES, range);
        if (constructionTargets.length > 0) {
            return constructionTargets[0];
        } else {
            return undefined;
        }
    }

    Creep.prototype.findNearestConstructionSiteId = function (range) {

        let cs = this.findConstructionSite(range)
        if (cs == undefined) {
            return undefined;
        }
        return cs.id
    }


    Creep.prototype.repairNearByStructures = function (range) {
        debugColor = "yellow"
        // if (this.room.name == debugRoomName) {
        //     console.log('<font color = '+ debugColor + '>[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] findNearestStructureToRepair </>');

        //  }
        var structures = this.room.lookForAtArea(LOOK_STRUCTURES, this.pos.y - range, this.pos.x - range, this.pos.y + range, this.pos.x + range, true);

        if (structures == undefined) {
         //    console.log('<font color = '+ debugColor + '>[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] no structures found </>');

            return undefined;
        }

        try {
            //   var structures = creep.room.lookForAtArea(LOOK_STRUCTURES, creep.pos.y-1, creep.pos.x-1, creep.pos.y+1, creep.pos.x+1, true);
              // console.log('[' + fileName + 'line:' + util.LineNumber() + '] ' + creep.room.name + ' ' + creep.name + ' structures is ' + structures);

            var workParts = this.getActiveBodyparts(WORK);
            if (workParts == 0) {
                return -1;
            }

            if (structures == undefined || structures == []) {
                return;
            }




            for (let i = 0; i < structures.length; i++) {

                var targetRepairStructure = structures[i]!.structure;

                if (targetRepairStructure.structureType != STRUCTURE_ROAD
                    && targetRepairStructure.structureType != STRUCTURE_CONTAINER
                    && targetRepairStructure.structureType != STRUCTURE_SPAWN
                    && targetRepairStructure.structureType != STRUCTURE_LINK
                    && targetRepairStructure.structureType != STRUCTURE_TERMINAL
                    && targetRepairStructure.structureType != STRUCTURE_RAMPART
                ) {

                    if (this.room.name == debugRoomName) {
                      //  console.log('<font color = ' + 'yellow ' + '>[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] Skipping targetRepairStructure.structureTyp: ' + targetRepairStructure.structureType + ' </>');

                    }
                    continue;
                    return;
                }

                // console.log ("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                // if (this.room.name == debugRoomName) {
                //     console.log('<font color = '+ 'yellow '  + '>[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] targetRepairStructure: ' + targetRepairStructure +' </>');

                //  }

                var hitsMax = targetRepairStructure.hitsMax;
                if (targetRepairStructure.structureType == STRUCTURE_RAMPART) {

                    hitsMax = 5000000;
                }

                if (targetRepairStructure.hits < hitsMax) {
                    var repairStatus = this.repair(targetRepairStructure);
                    if (this.room.name == debugRoomName) {
                       // console.log('<font color = ' + 'green' + '>[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + ']  Miner is repairing structure: ' + targetRepairStructure + '</>');

                    }

                    //    if (this.room.name == "E46S1") {
                    //   console.log('<font color = "yellow">[' + fileName + 'line:' + this.LineNumber() + '] repairStatus is ' + repairStatus +'</>');
                    // console.log('[' + fileName + 'line:' + this.LineNumber() + '] ' + creep.room.name + ' ' + creep.name + '  repairStatus is ' + repairStatus);
                    //    }

                    //  break;

                    return;

                }
                else {
                    if (this.room.name == debugRoomName) {
                      //  console.log('<font color = ' + debugColor + '>[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + ']  Miner is NOT repairing structure: ' + targetRepairStructure + '</>');

                    }
                }



            }
        } catch (e) {

            console.log('[' + fileName + 'line:' + this.lineNumber() + '] ' + this.room.name + ' ' + this.name + ' Trapped error while repairing roads is ' + e);
        }


        return undefined;
    }

    Creep.prototype.findNearestLink = function (range: number): AnyOwnedStructure | undefined {
        const links = this.pos.findInRange(FIND_MY_STRUCTURES, range, { filter: { structureType: STRUCTURE_LINK } });
        if (links.length > 0) {
            return links[0];
        } else {
            return undefined;
        }
    }


    // *************************************************************************************
    // Could return undefined or null of creep is in a unclaimed room.
    // *************************************************************************************
    Creep.prototype.findNearestSpawn = function (range) {
        // spawn could be undefined or null of creep is in a unclaimed room.
        // const spawn = this.pos.findClosestByRange(FIND_MY_SPAWNS,range);
        // return spawn;

        const spawns = this.pos.findInRange(FIND_MY_STRUCTURES, range, { filter: { structureType: STRUCTURE_SPAWN } });
        if (spawns.length > 0) {
            return spawns[0];
        } else {
            return undefined;
        }
    }


    Creep.prototype.findNearestSource = function (range) {
        // spawn could be undefined or null of creep is in a unclaimed room.
        // const spawn = this.pos.findClosestByRange(FIND_MY_SPAWNS,range);
        // return spawn;
        if (range == undefined) {
            range = 3;
        }

        const sources = this.pos.findInRange(FIND_SOURCES, range);
        if (sources.length > 0) {
            return sources[0];
        } else {
            return undefined;
        }
    }


    Creep.prototype.pause = function (pauseState,message) {
        if (this.memory.pause != undefined) {
            this.memory.pause = pauseState
            if (this.memory.pause == true) {
                if (message != undefined) {
                    this.say(message);
                }
                else{
                    this.say("paused");
                }

            }
            return this.memory.pause;
        }
        return undefined
    }


    Creep.prototype.pickupResources = function pickupResources(range) {
      //  util.pickupResources(this, range);
    }


    Creep.prototype.repairRoad = function repairRoad() {
        //util.repairRoad(this);
    }


    // Creep.prototype.energy = function energy() {
    //   //  return this.store[RESOURCE_ENERGY];
    //   return
    // }


    Creep.prototype.findNearestStructureByType = function (spawnOrCreep, structureType, range) {
       // return util.findNearestStructureByType(spawnOrCreep, structureType, range);
    }


    Creep.prototype.renewCheck = function (ticksToLive) {

        // do not renew creep if ignoreNew == true
        if (this.memory.ignoreRenew != undefined) {
            if (this.memory.ignoreRenew == true) {
                this.memory.renew = false;
                return false;
            }
        }

           if (this.ticksToLive! <= ticksToLive) {
                this.memory.renew = true;

            }
            // else{
            //     this.memory.renew = false;

            // }

            return    this.memory.renew

        // if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        //     if (this.ticksToLive <= ticksToLive) {
        //         this.memory.renew = true;
        //     }
        // }

        // if (this.memory.renew == true) {

        //     var closestSpawn = this.pos.findClosestByPath(FIND_MY_SPAWNS);
        //     var isNextToSpawn = this.pos.isNearTo(closestSpawn);
        //     if (!isNextToSpawn) {
        //         var travelToStatus = this.travelTo(closestSpawn);
        //         return this.memory.renew;
        //     }
        //     closestSpawn.renewCreep(this);
        //     if (this.ticksToLive >= 1450) {
        //         this.memory.renew = false;
        //     }

        //     return this.memory.renew;
        //     //var travelToStatus = creep.travelTo(closestSpawn);
        // }
    }


    Creep.prototype.getRenewed = function (renewAtTick, renewTicks, spawn, forceRenew) {
        if (renewTicks == undefined) {
            renewTicks = 1450;
        }


        if (this.memory.ignoreRenew == true && forceRenew != true) {
        //    console.log('<font color = "Red">[' + fileName + 'line:' + util.LineNumber() + ']  Warning: creep has ignoreRenew set to true. Creep: ' + this.name  +' in room '+ this.room.name+' </>');
            return;
        }

        this.renewCheck(renewAtTick)
       // console.log('<font color = "Red">[' + fileName + 'line:' + util.LineNumber() + ']   Creep: ' + this.name  +' in room '+ this.room.name+' this.memory.renew: '+ this.memory.renew + '</>');


        if (this.memory.renew == true || forceRenew == true) {
            var closestSpawn = spawn


            if (closestSpawn == undefined) {
                closestSpawn = this.pos.findClosestByRange(FIND_MY_SPAWNS);
            }
                var isNextToSpawn = this.pos.isNearTo(closestSpawn);
                if (!isNextToSpawn) {

                    this.moveTo(closestSpawn);
                    return this.memory.renew;
                }
                closestSpawn.renewCreep(this);
                if (this.ticksToLive! >= renewTicks) {
              //     console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + ']  renewTicks is ' + renewTicks +'</>');
               //    console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + ']  this.ticksToLive  is ' + this.ticksToLive  +'</>');
               //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + ']  this.memory.renew is being set to false </>');
                   this.memory.renew = false;
                }
                return this.memory.renew;


            //var travelToStatus = creep.travelTo(closestSpawn);
        }

        return this.memory.renew;


    }


    Creep.prototype.nearestLinkToController = function (range) {
        this.signController;
    };


    Creep.prototype.roomPosition = function (x, y) {
        var pos = new RoomPosition(x, y, "E26N3");
        return pos;
    };


    // Creep.prototype.parkIt = function () {
    //     if (this.pos.isEqualTo(this.memory.parkItPos) == false) {
    //         console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] 1this.memory.parkItPos is ' + this.memory.parkItPos + '</>');
    //         console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] this.pos.isEqualTo(this.memory.parkItPos) is ' + this.pos.isEqualTo(this.memory.parkItPos) + '</>');

    //         var moveStatus = this.moveTo(this.memory.parkItPos);
    //         return false;

    //         if (creep.pos.isNearTo(Game.spawns.Spawn2.pos)
    //             && creep.store.getFreeCapacity() > 0
    //             && Game.spawns.Spawn2.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    //             creep.transfer(Game.spawns.Spawn2, RESOURCE_ENERGY);
    //         } if (creep.pos.isNearTo(Game.spawns.Spawn2.pos)
    //             && creep.store.getFreeCapacity() > 0
    //             && Game.spawns.Spawn2.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    //             creep.transfer(Game.spawns.Spawn2, RESOURCE_ENERGY);
    //         }
    //     }
    // }


    Creep.prototype.goto = function (pos) {
        if (this.pos.isNearTo(pos) != true) {
            var moveStatus = this.moveTo(pos);
            return false;
        }
        return true
    }

    /////////////////////////////////////////////////////////
    // must set: creep.memory.gotoFlagName = "someFlagName"
    // gotoFlag will be removed from creep memory
    Creep.prototype.gotoFlag = function () {
        if (this.memory.gotoFlag) {
            let gotoFlag =  Game.flags[this.memory.gotoFlag] as Flag;
            if (this.pos.isEqualTo(gotoFlag) == false) {
                this.moveTo(gotoFlag);
                return;
            }

            //////////////////////////////////
            // remove flag name from memory
            if (this.pos.isEqualTo(gotoFlag) == true) {
                this.memory.gotoFlag = undefined;
            }
        }
    }


    Creep.prototype.travelNearTo = function(pos){
        if (this.pos.isNearTo(pos) == false) {
            this.moveTo(pos)
            if (this.pos.isNearTo(pos) == true) {
                return true;
            }
            else
            {
                return false;
            }
        }
        return
    }


    Creep.prototype.myTravelTo = function (pos, options) {
        if (this.pos.isNearTo(pos) != true) {
            var moveStatus = this.moveTo(pos, options);
          //  console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] moveStatus is ' + moveStatus + '</>');
           // console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] moving To location: ' + pos + '</>');
            return moveStatus;
        }
        return 0
    }


    Creep.prototype.gotoXY = function (x, y) {
        var pos = new RoomPosition(x, y, this.room.name)
        if (this.pos.isEqualTo(pos) != true) {
            var moveStatus = this.moveTo(pos);
            return false;
        }
        return true;
    }



    Creep.prototype.forceMove = function (reservedlocation, moveDirection) {
        var moveStatus: any;
        if (this.pos.isEqualTo(reservedlocation)) {
            if (this.store[RESOURCE_ENERGY] != 0) {
                moveStatus = this.move(moveDirection);
                if (moveStatus != 0) {
                     moveStatus = this.move(moveDirection++ as any);
                    if (moveStatus != 0) {
                         moveStatus = this.move(moveDirection++ as any);
                        if (moveStatus != 0) {
                             moveStatus = this.move(moveDirection++ as any);
                        }
                    }
                }
            }
            else {
                this.move(BOTTOM);
            }
        }
        return moveStatus;
    }



    Creep.prototype.getConstructionSiteInRange = function (range) {
        if (range == undefined) {
            range = 3;
        }
        var constructionSitesInRange = this.pos.findInRange(FIND_CONSTRUCTION_SITES,range);

        if (constructionSitesInRange != undefined) {
            if (constructionSitesInRange.length > 0) {
                return constructionSitesInRange[0];
            }
            return undefined;
        }
        return
    }

    Creep.prototype.transferEnergyToStorage = function () {
        if (this.room.storage !=  undefined) {
            if (this.store.getUsedCapacity() > 0){
                if (this.room.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                    // creep.say ("toTerm");
                    let transferStatus = this.transfer(this.room.storage, RESOURCE_ENERGY)
                    return transferStatus;
                }

            }
        }
        return
    }

    Creep.prototype.transferEnergyToTerminal = function () {
        if (this.room.terminal !=  undefined) {
            if (this.store.getUsedCapacity() > 0){
                if (this.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ) {
                    // creep.say ("toTerm");
                    let transferStatus = this.transfer(this.room.terminal, RESOURCE_ENERGY)
                    return transferStatus;
                }

            }``
        }
        return
    }


    Creep.prototype.getContainerUnderCreep = function(){

        // check if it has been cached
        if (this.memory.containerUnderCreepId != undefined) {
            return Game.getObjectById(this.memory.containerUnderCreepId)
        }


        let containerUnderCreep =  this.room.getContainerAtPos(this.pos)
        if (containerUnderCreep == undefined) {
            return undefined
        }

        this.memory.containerUnderCreepId = containerUnderCreep.id
        return
    }

    Creep.prototype.getContainerUnderMiner = function(creep) {

        return this.getContainerUnderCreep();


        // let source = Game.getObjectById(creep.memory.sourceId);
        // //    console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] source is ' + source + '</>');

        // //     // find container next to source
        // let container
        // try {
        //     container = source.pos.findInRange(FIND_STRUCTURES, 1, {
        //         filter: s => s.structureType == STRUCTURE_CONTAINER
        //         //  && s.store[RESOURCE_ENERGY] < 2000
        //     })[0];
        // }
        // catch (e) {
        //     console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] ........................e is ' + e + '</>');

        //     container = undefined;
        // }





        //        console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] container.pos is ' + container.pos + '</>');
        //      console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] creep.pos is ' + creep.pos + '</>');

        // if (container != undefined && creep.pos.isEqualTo(container)) {
        //     return container;
        // }
        // else {
        //     return undefined
        // }

    }

    Creep.prototype.stack = function() {
        let e = new Error();
        return e.stack;
    }



    Creep.prototype.getBuildTarget = function(){

        // only look for buildTarget if creep is in target room
        if (this.room.name != this.memory.targetRoomName) {
            return undefined
        }

          var  constructionSite = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: s => s.progress < s.progressTotal
                  //  && s.room.name == creep.room.name

            });

            return constructionSite;
    }


    Creep.prototype.getNearestEmptyExtension =  function(){

        // only look for extention if creep is in target room
        if (this.room.name != this.memory.targetRoomName) {
            return undefined
        }

            var  ext = this.pos.findClosestByRange(FIND_STRUCTURES, {
              filter:   s =>  s.structureType === STRUCTURE_EXTENSION
                &&  s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          });

          //creep.say("extcheck");
       //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] ext is ' + ext + '</>');

        return ext;
    }

    Creep.prototype.retreat = function(retreatFlagName: string | undefined)
    {
        let retreatLocation = undefined;
        let invaderUsername = undefined;

        if (retreatFlagName == undefined) {
            if (this.memory.retreatFlagName == undefined) {
                return null;
            }
        }
        else if(this.memory.retreatFlagName !=undefined &&  retreatFlagName == undefined) {

            retreatFlagName =  this.memory.retreatFlagName;
        }
        else if (retreatFlagName){
            this.memory.retreatFlagName = retreatFlagName;
        }

        if (this.memory.retreatFlagName != undefined) {
            retreatLocation = Game.flags[this.memory.retreatFlagName]
         //   this.say (retreatFlagName.name);

          //  this.say ("Retreat!");
          //  return;

        }
        else{
           this.say ("No Retreat");
            return;
        }

        //let invadedRoom = this.room;
        let invadedRoom = this.targetRoom();
        if (invadedRoom == undefined) {
            let invadedRoom = this.room;
        }
        let invaders = invadedRoom!.find(FIND_HOSTILE_CREEPS);
        let invaderCount = invaders.length

        if (invaderCount > 0 && this.room.controller!.safeMode == undefined) {
            invaderUsername = invaders[0]!.owner.username

              if (invaderCount > 1) {
                  this.moveTo(retreatLocation!);
                  this.say(invaderUsername +"s");

                  return true;
              }

              if (invaderCount = 1) {

             //     var spawn7 = Game.spawns["Spawn7"]
             //     var spawn9 = Game.spawns["Spawn9"]
                  //console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] invaderUsername is ' + invaderUsername + '</>');

                  if (invaderUsername != "csW") {
                      this.moveTo(retreatLocation!);
                      this.say(invaderUsername);
                      return  true;

                  }

                  this.say(invaderUsername);
                  return false;
              }
       }

         return false;

    }

    Creep.prototype.getNearestRoadTarget = function (){

            // only look for road Target if creep is in target room
            if (this.room.name != this.memory.targetRoomName) {
                return undefined
            }


        var  road = this.pos.findClosestByRange(FIND_STRUCTURES, {
              filter:   s =>  s.structureType === STRUCTURE_ROAD
               && s.hits < s.hitsMax
                //  && s.room.name == creep.room.name

          });

          var targetflagName = "Road_Repair_" + this.room.name;
          if (Game.flags.Road_Repair) {
            this.room.createFlag(road!.pos,targetflagName,COLOR_RED);
          }

        if (road != null) {
            Game.flags[targetflagName]!.setPosition(road.pos);
        }

        return road;
    }

    Creep.prototype.findContainersInRange = function(range) {
        let containers = this.pos.findInRange(FIND_STRUCTURES,5,{filter:   s =>  s.structureType === STRUCTURE_CONTAINER
            &&  s.store[RESOURCE_ENERGY] > 50})
            return containers;
    }


    Creep.prototype.findContainerInRange = function(range){
        let containers = this.findContainersInRange(range)
        let container = undefined
        if (containers.length > 0) {
            container = containers[0];
        }

        return container
    }



    Creep.prototype.lineNumber = function() {
        let e = new Error();
        let result = e.stack!.split("\n")[3]!.split(":") as String[];
        result.pop();
        return result.pop();
    }

        // Returns targetRoom or sets target room
        Creep.prototype.myTargetRoom = function(targetRoomName){

            if (targetRoomName == undefined) {
                if (this.memory.targetRoomName == undefined) {
                    return undefined
                }
            }
            else{
                this.memory.targetRoomName = targetRoomName
            }

            let targetRoom = Game.rooms[this.memory.targetRoomName!];
           // this.targetRoom = targetRoom
            return targetRoom;
        }

    // Returns targetRoom or sets target room
    Creep.prototype.targetRoom = function(targetRoomName){

        if (targetRoomName == undefined) {
            if (this.memory.targetRoomName == undefined) {
                return undefined
            }

            if (this.memory.targetRoomName != undefined) {
                return Game.rooms[this.memory.targetRoomName];
            }

        }
        else{
            this.memory.targetRoomName = targetRoomName
        }

        let targetRoom = Game.rooms[this.memory.targetRoomName!];
        return targetRoom;
    }

    Creep.prototype.retreat = function(retreatFlagName)
    {
        let retreatLocation = undefined;
        let invaderUsername = undefined;

        if (retreatFlagName == undefined) {
            if (this.memory.retreatFlagName == undefined) {
                return null;
            }
        }
        else{
            this.memory.retreatFlagName = retreatFlagName;
        }

        if (this.memory.retreatFlagName != undefined) {
            retreatLocation = Game.flags[this.memory.retreatFlagName]
         //   this.say (retreatFlagName.name);

          //  this.say ("Retreat!");
          //  return;

        }
        else{
           this.say ("No Retreat");
            return;
        }

        //let invadedRoom = this.room;
        let invadedRoom = this.targetRoom();
        if (invadedRoom == undefined) {
            let invadedRoom = this.room;
        }
        let invaders = invadedRoom!.find(FIND_HOSTILE_CREEPS);
        let invaderCount = invaders.length

        if (invaderCount > 0) {
            invaderUsername = invaders[0]!.owner.username

              if (invaderCount > 1) {
                  this.moveTo(retreatLocation!);
                  this.say(invaderUsername +"s");

                  return true;
              }

              if (invaderCount = 1) {

             //     var spawn7 = Game.spawns["Spawn7"]
             //     var spawn9 = Game.spawns["Spawn9"]
                  //console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.room.name + '] invaderUsername is ' + invaderUsername + '</>');

                  if (invaderUsername != "csW") {
                      this.moveTo(retreatLocation!);
                      this.say(invaderUsername);
                      return  true;

                  }

                  this.say(invaderUsername);
                  return false;
              }
       }

         return false;

    }

    Creep.prototype.myRetreat = function(retreatFlagName)
    {
        let target = this.myTargetRoom("E26S52");
        return this.retreat("Retreat_E25S52");

    }


    Object.defineProperty(Creep.prototype, "color", {
        set: function (val) {
            this._color = val.toUpperCase();
            return this._color;
        },

        get: function () {
            return this._color;

        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "terminal", {
        get: function () {
            if (this.room.terminal != undefined) {
                return this.room.terminal;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "storage", {
        get: function () {
            if (this.room.terminal != undefined) {
                return this.room.storage;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "renew", {
        set: function (val) {
            this.memory.renew = val;
            return this.memory.renew;
        },

        get: function () {
            return this.memory.renew;

        },
        enumerable: false,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "ignoreRenew", {
        set: function (val) {
            this.memory.ignoreRenew = val;
            return this.memory.ignoreRenew;
        },

        get: function () {
            return this.memory.ignoreRenew;

        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "sourceId", {
        set: function (val) {
            this.memory.sourceId = val;
            return this.memory.sourceId;
        },

        get: function () {
            if (this.memory.sourceId != undefined) {
                return this.memory.sourceId;
            }
            else {
                return undefined;
            }


        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "primaryEnergySourceId", {
        set: function (val) {
            this.memory.primaryEnergySourceId = val;
            return this.memory.primaryEnergySourceId;
        },

        get: function () {
            if (this.memory.primaryEnergySourceId != undefined) {
                return this.memory.primaryEnergySourceId;
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });


    Object.defineProperty(Creep.prototype, "nearestContainer", {
        // set: function (val) {
        //     this.memory.primaryEnergySourceId = val;
        //     return this.memory.primaryEnergySourceId;
        // },

        get: function () {

            var ClosestContainer = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s: { structureType: string; }) => s.structureType == STRUCTURE_CONTAINER
            });
           // console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] 11ClosestContainer is ' + ClosestContainer + '</>');



            if (ClosestContainer != undefined) {
                return ClosestContainer;
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "isFull", {
        // set: function (val) {
        //     this.memory.primaryEnergySourceId = val;
        //     return this.memory.primaryEnergySourceId;
        // },

        get: function () {

       // var capacity = this.store.getCapacity()
        var free = this.store.getFreeCapacity()
        if (free == 0) {
            return true;
        }

        return false;


        },
        enumerable: false,
        configurable: true
    });

    Object.defineProperty(Creep.prototype, "isEmpty", {
        // set: function (val) {
        //     this.memory.primaryEnergySourceId = val;
        //     return this.memory.primaryEnergySourceId;
        // },

        get: function () {

       var capacity = this.store.getCapacity()
        var free = this.store.getFreeCapacity()
        if (capacity == free) {
            return true;
        }

        return false;


        },
        enumerable: false,
        configurable: true
    });

    ///////////////////////////////////////////////////////////////
    // not finished. Does not work
    ///////////////////////////////////////////////////////////////

    // Object.defineProperty(Creep.prototype, "nearestSource", {
    //     set: function (val) {
    //         this.memory.primaryEnergySourceId = val;
    //         return this.memory.primaryEnergySourceId;
    //     },

    //     get: function () {

    //         var ClosestContainer = creep.pos.findClosestByPath(FIND_SOURCE, {
    //             filter: s => s.structureType == STRUCTURE_CONTAINER
    //         });
    //        console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] 11ClosestContainer is ' + ClosestContainer + '</>');



    //         if (ClosestContainer != undefined) {
    //             return ClosestContainer;
    //         }
    //         else {
    //             return undefined;
    //         }
    //     },
    //     enumerable: true,
    //     configurable: true
    // });


    // Creep.prototype.findNearestSource(){

    // }




//}
