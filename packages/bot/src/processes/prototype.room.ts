//var util = require('Util')

//const Util = util = require('./Util');
//const util = require('./Util');

var fileName = "Room.prototype      "

interface Room {
    error: (message: string, lineNumber: number) => void;
    warning: (message: string, lineNumber: string) => void;
    message: (message: string, lineNumber: string) => void;
    overlayText: (overlayText: string, x: number, y: number, overlayColor: string | undefined) => void;
    terminalOverlay: (x: any, y: any, overlayColor: any, overlayText: any) => void;
    storageOverlay: (x: any, y: any, overlayColor: any, overlayText: any) => void;
    container1Overlay: (x: any, y: any, overlayColor: any, overlayText: any) => void;
    getSource1Container(pos?: any):any;
    container2Overlay: (x: any, y: any, overlayColor: any, overlayText: any) => void;
    getSource2Container(pos?: any |undefined):any;
    source2Overlay: (x: any, y: any, overlayColor: any, overlayText: any) => void;
    Source2: Source | undefined;
    source1Overlay: (x: any, y: any, overlayColor: any, overlayText: string | undefined) => undefined;
    Source1: Source | undefined;
    getControllerLink: (_optionalFlagOrPos: undefined) => any;
    getLinkAtPos(pos: any): any;
    getSource2Link: (_optionalFlagOrPos?: Flag | RoomPosition | undefined) => StructureLink | undefined;
    getSource1Link: (_optionalFlagOrPos?: Flag | RoomPosition | undefined) => StructureLink | undefined;
    getContainerAtPos(pos: any):any;
    getControllerContainer: (range: number | undefined) => _HasId | null | undefined;
    getObjAtPos(pos: Flag | RoomPosition, LOOK_STRUCTURES: string, STRUCTURE_CONTAINER: string):any;
    getSpawnAtPos: (FlagOrPos: Flag | RoomPosition) => StructureSpawn;
    getFirstSpawn: () => any;
    getEnergyOnGround: (pos: { lookFor: (arg0: string) => any[]; } | undefined) => any;
   // getSource1EnergyOnGround: () => any;
    getSource2EnergyOnGround: () => any;
    getResource: (pos: any) => any;
    getStructureByType: (pos: any, _structureType: any) => any;
    getSourcesInRoom: () => Source[];
    getNumberOfSourcesInRoom: () => any;
    getSource: (sourceFlagName: string) => Source | undefined;
    getFirstSpawnx: () => StructureSpawn | undefined;
    getSource_1: () => any;
    source1FlagName: string;
    getSource1Spawn: (sourceFlagName: string) => any;
    getSource2Spawn: (sourceFlagName: string) => any;
    getSource_2():Source | undefined;
    source2FlagName: string;
    LineNumber: () => string |0| undefined;
    getConstructionSites: () => ConstructionSite<BuildableStructureConstant>[] | undefined;
    getRamparts: (maxRampartHits: number | undefined) => AnyOwnedStructure [] | undefined;

}

interface StructureTower{
    needsEnergy: boolean;
}
//module.exports = function () {


    // console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] **************************************************</>');
    // console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] ERROR: ' + error +'</>');
    // console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + creep.room.name + '] **************************************************</>');

    Room.prototype.error = function(message: string,lineNumber: number){
        console.log('<font color = "red">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] **************************************************</>');
        console.log('<font color = "red">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] ERROR: ' + message +'</>');
        console.log('<font color = "red">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] **************************************************</>');
        return;
    }

    Room.prototype.warning = function(message: string,lineNumber: string){
        console.log('<font color = "orange">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] **************************************************</>');
        console.log('<font color = "orange">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] WARNING: ' + message +'</>');
        console.log('<font color = "orange">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] **************************************************</>');
        return;
    }


    Room.prototype.message = function(message: string,lineNumber: string){
        console.log('<font color = "greem">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] **************************************************</>');
        console.log('<font color = "greem">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] message: ' + message +'</>');
        console.log('<font color = "greem">[' + fileName + 'line:' + lineNumber + '] room[' + this.name + '] **************************************************</>');
        return;
    }



    Room.prototype.overlayText = function(overlayText: string,x: number,y: number,overlayColor: string | undefined){
        if (overlayColor == undefined) {
            overlayColor = "yellow";
        }
        new RoomVisual(this.name).text(overlayText, x, y, { color: overlayColor, font: 0.6, align: 'left' });
    }

    Room.prototype.terminalOverlay = function(x: any,y: any,overlayColor: any,overlayText: any){
        var terminal = this.terminal;
        if (terminal != undefined) {
            this.overlayText("terminal: " + terminal.store[RESOURCE_ENERGY], x, y, overlayColor)
        }
       // new RoomVisual(room.name).text("container1: " + container1.store[RESOURCE_ENERGY], x, y, { color: 'yellow', font: 0.6, align: 'left' });
    }

    Room.prototype.storageOverlay = function(x: any,y: any,overlayColor: any,overlayText: any){
        var storage = this.storage;
        if (storage != undefined) {
            this.overlayText("storage: " + storage.store[RESOURCE_ENERGY], x, y, overlayColor)
        }
       // new RoomVisual(room.name).text("container1: " + container1.store[RESOURCE_ENERGY], x, y, { color: 'yellow', font: 0.6, align: 'left' });
    }

    Room.prototype.container1Overlay = function(x: any,y: any,overlayColor: any,overlayText: any){
        var container1 = this.getSource1Container();
        if (container1 != undefined) {
            this.overlayText("container1: " + container1.store[RESOURCE_ENERGY], x, y, overlayColor)
        }
       // new RoomVisual(room.name).text("container1: " + container1.store[RESOURCE_ENERGY], x, y, { color: 'yellow', font: 0.6, align: 'left' });
    }

    Room.prototype.container2Overlay = function(x: any,y: any,overlayColor: any,overlayText: any){
        var container2 = this.getSource2Container();
        if (container2 != undefined) {
            this.overlayText("container2: " + container2.store[RESOURCE_ENERGY], x, y, overlayColor)
        }
    }

    Room.prototype.source2Overlay = function(x: any,y: any,overlayColor: any,overlayText: any){
      //  var source2 = this.Source2;
        if (this.Source2 != undefined) {
            this.overlayText("Source2: " + this.Source2.energy + " / " + this.Source2.ticksToRegeneration, x,y,overlayColor)
        }

    }


    Room.prototype.source1Overlay = function(x: any,y: any,overlayColor: any,overlayText: string | undefined){

        if (this.Source1 == undefined) {
            return undefined
        }
        if (overlayText == undefined) {
            overlayText = "Source1: " + this.Source1.energy + " / " + this.Source1.ticksToRegeneration
        }
          this.overlayText(overlayText,x,y,overlayColor)

          return
      }



    Room.prototype.getControllerLink = function(_optionalFlagOrPos: undefined){

        if (this.memory.controllerLinkId != undefined) {
            return Game.getObjectById(this.memory.controllerLinkId);
        }

        var pos = undefined;
        if (_optionalFlagOrPos != undefined) {
            pos = _optionalFlagOrPos;
        }

        if (pos == undefined) {
            pos = Game.flags["Controller_Link_" + this.name]
            if (pos == undefined) {
                return undefined;
            }
//            return this.getLinkAtPos(pos);
            let linkFound = this.getLinkAtPos(pos);
            if (linkFound != undefined) {
                this.memory.controllerLinkId = linkFound.id
            }
            return linkFound;
        }


    }

    Room.prototype.getSource2Link = function(_optionalFlagOrPos?: Flag | RoomPosition | undefined) {
        if (this.memory.source2LinkId != undefined) {
            return Game.getObjectById(this.memory.source2LinkId) as StructureLink;
        }

        var pos = undefined;
        if (_optionalFlagOrPos != undefined) {
            pos = _optionalFlagOrPos;
        }

        if (pos == undefined) {
            pos = Game.flags["Source2_Link_" + this.name]
            if (pos == undefined) {
                return undefined;
            }

            let linkFound = this.getLinkAtPos(pos);
            if (linkFound != undefined) {
                this.memory.source2LinkId = linkFound.id
            }
            return linkFound;
        }


    }

    Room.prototype.getSource1Link = function(_optionalFlagOrPos?: Flag | RoomPosition | undefined){

        if (this.memory.source1LinkId != undefined) {
            return Game.getObjectById(this.memory.source1LinkId)  as StructureLink;
        }

        var pos = undefined;
        if (_optionalFlagOrPos != undefined) {
            pos = _optionalFlagOrPos;
        }

        if (pos == undefined) {
            pos = Game.flags["Source1_Link_" + this.name]
            if (pos == undefined) {
                return undefined;
            }

        }

        let linkFound = this.getLinkAtPos(pos);
        if (linkFound != undefined) {
            this.memory.source1LinkId = linkFound.id
        }
        return linkFound;
    }


    Room.prototype.getSource1Container = function(_optionalFlagOrPos: any | undefined){


        if (this.memory.source1ContainerId != undefined) {
            return Game.getObjectById(this.memory.source1ContainerId);
       }


        var pos = undefined;
        if (_optionalFlagOrPos != undefined) {
            pos = _optionalFlagOrPos;
        }

        if (pos == undefined) {
            pos = Game.flags["Source1_Container_" + this.name]
            if (pos == undefined) {
                return undefined;
            }
          //  return this.getContainerAtPos(pos);

          let containerFound = this.getContainerAtPos(pos);
          if (containerFound != undefined) {
              this.memory.source1ContainerId = containerFound.id
         }
         return containerFound;


        }


    }


    Room.prototype.getControllerContainer = function(range: number | undefined){

        if (this.memory.controllerContainerId != undefined) {
            return Game.getObjectById(this.memory.controllerContainerId);
       }


        //////////////////////////////////////////////////////////////////////
        // if container flag exists, then get container at flag location
        let controllerContainer = undefined;
        // let controllerContainerFlag = Game.flags["Controller_Container_" + this.room.name]
        // if (controllerContainerFlag != undefined) {
        //         return this.getContainerAtPos(controllerContainerFlag);
        // }

       // var range = undefined;
        if (range != undefined) {
            range = 5;
        }

        let controller = this.controller;

        if (controller == undefined) {
            return undefined
        }

        // const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        //     filter: { structureType: STRUCTURE_EXTENSION }

        let containersFound = controller.pos.findInRange(107,range!,{filter: s=> s.structureType == STRUCTURE_CONTAINER})
      // let containersFound = controller.pos.findInRange(FIND_STRUCTURES,range,{structureType == STRUCTURE_CONTAINER})
      //  console.log('<font color = "greem">room[' + this.name + '] range is ' + range + '</>');
      //  console.log('<font color = "greem">room[' + this.name + '] containersFound is ' + containersFound + '</>');
      //  console.log('<font color = "greem">room[' + this.name + '] containersFound[0] is ' + containersFound[0] + '</>');


        if (containersFound.length > 0) {
            this.memory.controllerContainerId = containersFound[0]!.id
            return containersFound[0];
        }

        return undefined
    }


    //Source2_Link_E21S55
    Room.prototype.getSource2Container = function(_optionalFlagOrPos: undefined){

       if (this.memory.source2ContainerId != undefined) {
            return Game.getObjectById(this.memory.source2ContainerId);
       }

        var pos = undefined;
        if (_optionalFlagOrPos != undefined) {
            pos = _optionalFlagOrPos;
        }

        if (pos == undefined) {
            pos = Game.flags["Source2_Container_" + this.name]
            if (pos == undefined) {
                return undefined;
            }

        }



        let containerFound = this.getContainerAtPos(pos);

        if (containerFound != undefined) {

            this.memory.source2ContainerId = containerFound.id

       }
       return containerFound;

    }


    Room.prototype.getContainerAtPos = function(FlagOrPos: undefined){
        var pos = undefined;
        if (FlagOrPos != undefined) {
            pos = FlagOrPos;
        }

        if (pos == undefined) {
                return undefined;
        }


        return this.getObjAtPos(pos, LOOK_STRUCTURES, STRUCTURE_CONTAINER)


    }


    Room.prototype.getSpawnAtPos = function(FlagOrPos: Flag | RoomPosition){
        var pos = undefined;
        if (FlagOrPos != undefined) {
            pos = FlagOrPos;
        }

        if (pos == undefined) {
                return undefined;
        }


        return this.getObjAtPos(pos, LOOK_STRUCTURES, STRUCTURE_SPAWN)


    }


    Room.prototype.getFirstSpawn = function(){

        if (this.memory.firstSpawnId != undefined) {
            return Game.getObjectById(this.memory.firstSpawnId)
        }


        const firstSpawnFlag = Game.flags["FirstSpawn_" + this.name] as Flag
        let spawn = this.getSpawnAtPos(firstSpawnFlag)

        if (spawn != undefined) {
            this.memory.firstSpawnId = spawn.id
        }

        return spawn;

      //  return this.getObjAtPos(pos, LOOK_STRUCTURES, STRUCTURE_SPAWN)


    }

    Room.prototype.getEnergyOnGround = function(pos: { lookFor: (arg0: string) => any[]; } | undefined){
        if (pos == undefined) {
            return undefined;
        }

        let energy = pos.lookFor(LOOK_ENERGY)[0];

        if (energy.length > 0) {
            return energy[0];
        }
    }


    // Room.prototype.getSource1EnergyOnGround = function(){
    //     let source1ContainerFlag = Game.flags["Source1_Container_" + this.name]
    //     if (source1ContainerFlag.length > 0) {
    //         return source1ContainerFlag[0];
    //     }
    // }


    // Room.prototype.getSource2EnergyOnGround = function(){
    //     let source2ContainerFlag = Game.flags["Source2_Container_" + this.name]
    //     if (source2ContainerFlag.length > 0) {
    //         return source2ContainerFlag[0];
    //     }
    // }


    Room.prototype.getLinkAtPos = function(FlagOrPos: undefined){
        var pos = undefined;
        if (FlagOrPos != undefined) {
            pos = FlagOrPos;
        }

        if (pos == undefined) {
                return undefined;
        }


        return this.getObjAtPos(pos, LOOK_STRUCTURES, STRUCTURE_LINK)


    }


    Room.prototype.getResource = function(pos: any)
    {

           return this.getObjAtPos(pos,LOOK_RESOURCES,LOOK_RESOURCES);


           Room.prototype.getStructureByType = function(pos: any,_structureType: any){
               //console.log('<font color = "greem">room[' + this.name + '] _structureType is ' + _structureType + '</>');

               return this.getObjAtPos(pos, LOOK_STRUCTURES, _structureType)
            }
    }

    Room.prototype.getObjAtPos = function(pos: RoomPosition | { pos: RoomPosition; } | undefined,_looktype: string, _objType: string){
      //  console.log('<font color = "greem">room[' + this.name + ']xxxxxxxxxxxxxxxxxxxxxxxxxx _objType is ' + _objType + '</>');

       // var source1Flag = this.find(FIND_FLAGS, {filter: s=> s.name.includes(sourceFlagName)})[0];
       //  console.log('<font color = "green">[' + fileName + '] [line:'+ this.LineNumber()+ '] xxxxxxxxxxxxxxxxxxxx sourceFlagName is ' + sourceFlagName  + '</>');
       // console.log('<font color = "green">[' + fileName + '] JSON.stringify(sourceFlagName) is ' + JSON.stringify(sourceFlagName) + '</>');
     //   console.log('<font color = "pink">room[' + this.name + '] _looktype is ' + _looktype + '</>');

           if (pos == undefined) {
               return undefined;
           }

           const look = this.lookAt(pos);
          // console.log('<font color = "green">[' + this.name + '] look is ' + look+ '</>');

       //    return Game.getObjectById("c44207728e621fc");
          // return Game.getObjectById(Memory.W7N4.source1Id);c44207728e621fc
           var  itemObj
           look.forEach(function(lookObject) {
            //console.log('<font color = "greem">room[' + this.name + '] lookObject.type is ' + lookObject.type + ' lookObject[_objType] '+lookObject[_objType] +' </>');




            if(lookObject.type == _looktype) {

                if(lookObject.type == _objType) {
                    itemObj = lookObject[_objType]
                    return itemObj;
                }

                if (lookObject[LOOK_STRUCTURES]!.structureType == _objType) {
               //     console.log('<font color = "red"> room[' + this.name + '] lookObject[' + LOOK_STRUCTURES + '].structureType is ' + lookObject[LOOK_STRUCTURES].structureType + '</>');

                   itemObj = lookObject[LOOK_STRUCTURES];
                   return itemObj;
                }
                //   console.log('<font color = "pink">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');
           //   console.log('<font color = "pink">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');

          //    console.log('<font color = "pink"> room[' + this.name + '] JSON.stringify(lookObject) is ' + JSON.stringify(lookObject) + '</>');
            //  itemObj = lookObject[_objType]
         //    console.log('<font color = "greem"> room[' + this.name + '] lookObject[_looktype] is ' + lookObject[_looktype] + '</>');

             // return lookObject;
            //  return lookObject[LOOK_SOURCES]
               }

            //    if(lookObject.type == _objType) {
            //    // console.log('<font color = "pink">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');
            //    // console.log('<font color = "pink">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');

            //    // console.log('<font color = "pink"> room[' + this.name + '] JSON.stringify(lookObject) is ' + JSON.stringify(lookObject) + '</>');
            //     itemObj = lookObject[_objType]
            //  //  console.log('<font color = "greem"> room[' + this.name + '] lookObject[_looktype] is ' + lookObject[_looktype] + '</>');

            //    // return lookObject;
            //   //  return lookObject[LOOK_SOURCES]
            //      }

                //  if (lookObject.type == LOOK_STRUCTURES) {
                //     console.log('<font color = "greem">room[' + this.name + '] start -----------------------------------------</>');

                //     console.log('<font color = "greem">room[' + this.name + '] _objType is ' + _objType + '</>');
                //     console.log('<font color = "greem">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');
                //    console.log('<font color = "pink">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');

                //     console.log('<font color = "greem"> room[' + this.name + '] JSON.stringify(lookObject) is ' + JSON.stringify(lookObject) + '</>');
                //     console.log('<font color = "greem"> room[' + this.name + '] lookObject[' + LOOK_STRUCTURES + '].structureType is ' + lookObject[LOOK_STRUCTURES].structureType + '</>');
                //     console.log('<font color = "greem"> room[' + this.name + '] lookObject[ _objType is ' + _objType + '</>');

                //     if (lookObject[LOOK_STRUCTURES].structureType == _objType) {
                //         console.log('<font color = "red"> room[' + this.name + '] lookObject[' + LOOK_STRUCTURES + '].structureType is ' + lookObject[LOOK_STRUCTURES].structureType + '</>');

                //        itemObj = lookObject[LOOK_STRUCTURES];
                //        return itemObj;
                //     }
                //    itemObj = lookObject[LOOK_STRUCTURES][_objType]

                //    console.log('<font color = "greem"> room[' + this.name + '] should be a container is ' + itemObj + '</>');
                //    console.log('<font color = "greem">room[' + this.name + '] end -----------------------------------------</>');


                //  }
        return
           }
        );

//           console.log('<font color = "red"> room[' + this.name + '] Major error unable to locate source1 in room:' +this.name+ '</>');
       //    console.log('<font color = "greem"> room[' + this.name + '] JSON.stringify(source) is ' + JSON.stringify(source) + '</>');
           //console.log('<font color = "yellow"> room[' + this.name + '] returning itemObj is ' + itemObj + '</>');


           return  itemObj;

    }

    Room.prototype.getSourcesInRoom= function (){
        return this.find(FIND_SOURCES);
    },


    Room.prototype.getNumberOfSourcesInRoom = function()
    {
        return this.getSourcesInRoom().length;
    },


    Room.prototype.getSource = function(sourceFlagName: string): Source | undefined
    {
        var source1Flag = this.find(FIND_FLAGS, {filter: s=> s.name.includes(sourceFlagName)})[0];
       //  console.log('<font color = "green">[' + fileName + '] [line:'+ this.LineNumber()+ '] xxxxxxxxxxxxxxxxxxxx sourceFlagName is ' + sourceFlagName  + '</>');
       // console.log('<font color = "green">[' + fileName + '] JSON.stringify(sourceFlagName) is ' + JSON.stringify(sourceFlagName) + '</>');

           if (source1Flag == undefined) {
               return undefined;
           }

           const look = this.lookAt(source1Flag.pos);
          // console.log('<font color = "green">[' + this.name + '] look is ' + look+ '</>');

       //    return Game.getObjectById("c44207728e621fc");
          // return Game.getObjectById(Memory.W7N4.source1Id);c44207728e621fc
           var source
           look.forEach(function(lookObject) {
           if(lookObject.type == LOOK_SOURCES) {
             // console.log('<font color = "greem">room[' + this.name + '] lookObject.type is ' + lookObject.type + '</>');
             // console.log('<font color = "greem"> room[' + this.name + '] JSON.stringify(lookObject) is ' + JSON.stringify(lookObject) + '</>');
                source = lookObject.source;
             // return lookObject;
            //  return lookObject[LOOK_SOURCES]
               }
           });

//           console.log('<font color = "red"> room[' + this.name + '] Major error unable to locate source1 in room:' +this.name+ '</>');
       //    console.log('<font color = "greem"> room[' + this.name + '] JSON.stringify(source) is ' + JSON.stringify(source) + '</>');

           return source;

    }

    // Room.prototype.getFirstSpawnx = function()
    // {

    //     const firstSpawnFlag = Game.flags["FirstSpawn_" + room.name]



    //     var myspawns = this.find(FIND_MY_SPAWNS);
    //     //let spawns = _.values(myspawns);


    //     for (let index = 0; index < myspawns.length; index++) {
    //         const spawn = myspawns[index];
    //         if (spawn!.memory.firstSpawn != undefined) {
    //          //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] spawn is ' +spawn +'</>');
    //             return spawn;
    //         }

    //     }

    //     // myspawns.forEach(spawn => {
    //     //         if (spawn.memory.firstSpawn != undefined) {
    //     //             console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] spawn is ' +spawn +'</>');
    //     //             return spawn;
    //     //     }

    //     // });

    //     // if (this.name == "E25S52") {
    //     //     return Game.spawns.Spawn3;
    //     // }

    //     if (myspawns.length > 0) {
    //         return myspawns[0];
    //     }
    //     return
    // }

    Room.prototype.getSource_1= function()
    {
        if (this.memory.source1Id != undefined) {
            return Game.getObjectById(this.memory.source1Id);
        }

        if (this.source1FlagName == undefined) {
            return undefined;
        }

       // console.log('<font color = "green">[' + fileName + 'line:' + this.LineNumber() + '] room[' + this.name + '] this is ' + this  + '</>');
      //  console.log('<font color = "green">[' + fileName + 'line:' + this.LineNumber() + '] room[' + this.name + '] JSON.stringify(this) ' + JSON.stringify(this)  + '</>');
  //      console.log('<font color = "green">[' + fileName + 'line:' + this.LineNumber() + '] room[' + this.name + '] source1FlagName is ' + this.source1FlagName  + '</>');


      //  var sourceFlagName = this.source1FlagName
        //console.log('<font color = "green">[' + fileName + '][line:' + '0083'+ '] room[' + this.name + '] this.source1FlagName is ' +this.source1FlagName  + '</>');

       // var sourceFound = this.getSource (sourceFlagName);
        //console.log('<font color = "green">[' + fileName + '][line:' + '0086'+ '] room[' + this.name + '] this.getSource (sourceFlagName); is ' + this.getSource (sourceFlagName) + '</>');

       // return this.getSource (sourceFlagName);

        var sourceFlagName = this.source1FlagName
        let source = this.getSource (sourceFlagName);
        if (source != undefined) {
            this.memory.source1Id = source.id;
        }

        return source

    },

    Room.prototype.getSource1Spawn = function(sourceFlagName: any){

        if (this.memory.source1SpawnId != undefined) {
            return Game.getObjectById(this.memory.source1SpawnId);
        }

        var source1 = this.getSource_1();
     //  console.log('<font color = "yellow">[' + fileName + 'line:' + Util.LineNumber() + '] room[' + this.name + '] source1 is ' + source1 +'</>');
     //   console.log('<font color = "yellow">[' + fileName + 'line:' + Util.LineNumber() + '] room[' + this.name + '] this.Source1 is ' + this.Source1 +'</>');

    try {

    const spawns = source1.pos.findInRange(FIND_MY_STRUCTURES, 3, { filter: { structureType: STRUCTURE_SPAWN } });
        if (spawns != undefined) {
            if (spawns.length > 0) {
                this.memory.source1SpawnId = spawns[0].id;
                return spawns[0]
            }
        }

    } catch (error) {
       //   console.log('<font color = "yellow">[' + fileName + 'line:' + Util.LineNumber() + '] room[' + this.name + '] trapped error: ' + error +'</>');

    }


        return undefined;

    }

    Room.prototype.getRamparts = function(maxRampartHits: number | undefined) {

        if(maxRampartHits == undefined)
        {
            maxRampartHits = 300000000
        }

        const ramparts = this.find(FIND_MY_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_RAMPART
                && i.hits < maxRampartHits!
             })

             return ramparts;

    }


    Room.prototype.getSource2Spawn = function(sourceFlagName: any){

        if (this.memory.source2SpawnId != undefined) {
            return Game.getObjectById(this.memory.source2SpawnId);
        }


        // var source2 = this.Source2
        var source2 = this.getSource_2();
        if (source2 == undefined) {
         //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] Prototype error Source2 should not be undefined. Source2: ' + Source2 +'</>');
            return undefined;
        }

        var source2 = this.Source2


        const spawns = source2!.pos.findInRange(FIND_MY_STRUCTURES, 3, { filter: { structureType: STRUCTURE_SPAWN } });
        if (spawns.length > 0) {
            this.memory.source2SpawnId = spawns[0]!.id;
            return spawns[0]
        }

        return undefined;

    }

    // Room.prototype.retreat = function(creep)
    // {
    //     let invaders = this.find(FIND_HOSTILE_CREEPS);
    //     let invaderCount = invaders.length
    //      if (invaderCount > 0) {
    //           if (invaderCount > 1) {
    //               creep.moveTo(Game.spawns["Spawn7"]);
    //               return true;
    //           }

    //           if (invaderCount = 1) {
    //               var invaderUsername = invaders[0].owner.username
    //               var spawn7 = Game.spawns["Spawn7"]
    //               var spawn9 = Game.spawns["Spawn9"]
    //               console.log('<font color = "red">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] invaderUsername is ' + invaderUsername + '</>');

    //               if (invaderUsername != "csW") {
    //                   creep.moveTo(spawn7);
    //               }
    //               else
    //               {
    //                   creep.moveTo(spawn9);
    //               }

    //               creep.say(invaderUsername);
    //               return true;
    //           }
    //      }

    //      return false;

    // }

   // StructureTower.prototype.needsEnergy =


   Object.defineProperty(StructureTower.prototype, "needsEnergy", {
        get: function () {
           // return this.needsEnergy;

        //    try {
        //     if (Memory!.rooms[this.room.roomName]!.towers[this.id].needsEnergy == undefined) {
        //         if (Memory!.rooms[this.room.roomName]!.towers[this.id] == undefined) {
        //             Memory!.rooms[this.room.roomName]!.towers[this.id] =
        //         }
        //         Memory!.rooms[this.room.roomName]!.towers[this.id].needsEnergy =="";
        //         return  Memory!.rooms[this.room.roomName]!.towers[this.id].needsEnergy;
        //        }
        //    }
        //    catch (error) {
        //     return undefined;
        //    }
            return  Memory!.rooms[this.room.roomName]!.towers[this.id].needsEnergy;
        },

        set: function (value: boolean) {
        //    this.needsEnergy = value;
            Memory!.rooms[this.room.roomName]!.towers[this.id].needsEnergy = value
        },
        enumerable: false,
        configurable: true
    }),

    Room.prototype.getSource_2 = function(): Source
    {
        if (this.memory.source2Id != undefined) {
            return Game.getObjectById(this.memory.source2Id) as Source;
        }

        var sourceFlagName = this.source2FlagName

        let source = this.getSource (sourceFlagName);

        if (source != undefined) {
            this.memory.source2Id = source.id;
        }
        return Game.getObjectById(this.memory.source2Id) as Source;
    },


    Object.defineProperty(Room.prototype, "Source_1", {
        get: function () {
         //   return Game.getObjectById("c44207728e621fc")
            var source1Flag = this.find(FIND_FLAGS, {filter: (s: { name: string | string[]; })=> s.name.includes("Source_") })[0];
         //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] source1Flag.name is ' + source1Flag.name  + '</>');
         //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] JSON.stringify(source1Flag) is ' + JSON.stringify(source1Flag) + '</>');

             if (source1Flag == undefined) {
                 return undefined;
             }

             const look = this.lookAt(source1Flag.pos);
            //console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + room.name + '] look is ' + look+ '</>');

             var s1
             look.forEach(function(lookObject: { type: string; source: any; }) {
             if(lookObject.type == LOOK_SOURCES) {
              //   console.log('<font color = "yellow">room[' + util.name + '] lookObject.type is ' + lookObject.type + '</>');
              //   console.log('<font color = "yellow"> room[' + util.name + '] JSON.stringify(lookObject) is ' + JSON.stringify(lookObject) + '</>');

                 s1 = lookObject.source
                 }
             });

             return s1;

        },
        enumerable: false,
        configurable: true
    }),

    Object.defineProperty(Room.prototype, "firstSpawn", {
        get: function () {
            if (this.memory.firstSpawnId != undefined) {
                return Game.getObjectById(this.memory.firstSpawnId)
            }

            let spawn = this.getFirstSpawn();
            if (spawn != undefined) {
                this.memory.firstSpawnId = spawn.id
            }

            return spawn;
    },
        enumerable: false,
        configurable: true
    }),

    Object.defineProperty(Room.prototype, "source2Spawn", {
        get: function () {
            return this.getSource2Spawn();
    },
        enumerable: false,
        configurable: true
    }),


    Object.defineProperty(Room.prototype, "xSource_2", {
        get: function () {
        //    return Game.getObjectById("80d207728e6597b")

            var source2Flag = this.find(FIND_FLAGS, {filter: (s: { name: string | string[]; })=> s.name.includes("Source2_") })[0];
         //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] source1Flag.name is ' + source1Flag.name  + '</>');
         //   console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + this.name + '] JSON.stringify(source1Flag) is ' + JSON.stringify(source1Flag) + '</>');

             if (source2Flag == undefined) {
                 return undefined;
             }

             const look = this.lookAt(source2Flag.pos);
            //console.log('<font color = "yellow">[' + fileName + 'line:' + util.LineNumber() + '] room[' + room.name + '] look is ' + look+ '</>');

             var s2
             look.forEach(function(lookObject: { type: string; source: any; }) {
             if(lookObject.type == LOOK_SOURCES) {
              //   console.log('<font color = "yellow">room[' + util.name + '] lookObject.type is ' + lookObject.type + '</>');
              //   console.log('<font color = "yellow"> room[' + util.name + '] JSON.stringify(lookObject) is ' + JSON.stringify(lookObject) + '</>');

                 s2 = lookObject.source
                 }
             });

             return s2;


        },
        enumerable: false,
        configurable: true
    }),


    Object.defineProperty(Room.prototype, "Source_2", {
        get: function () {
            return this.getSource_2()
        },
        enumerable: false,
        configurable: true
    }),


    Object.defineProperty(Room.prototype, "Source1", {
        get: function () {
          //  return Game.getObjectById("c44207728e621fc");
    //     console.log('<font color = "yellow">[' + fileName + 'line:' + Util.LineNumber() + '] room[' + this.name + '] this.getSource_1() is ' + this.getSource_1() +'</>');
    //  /   console.log('<font color = "yellow">[' + fileName + 'line:' + Util.LineNumber() + '] room[' + this.name + '] this.Source1 is ' + this.Source1 +'</>');

            return this.getSource_1()
        },
        enumerable: false,
        configurable: true
    }),

    Object.defineProperty(Room.prototype, "Source2", {
        get: function () {

           // return Game.getObjectById("80d207728e6597b");
            return this.getSource_2()
        },
        enumerable: false,
        configurable: true
    }),

    Object.defineProperty(Room.prototype, "source2", {
        get: function () {
            return this.getSource_2()
        },
        enumerable: false,
        configurable: true
    }),


    Object.defineProperty(Room.prototype, "numberOfSources", {
        get: function () {
            return this.find(FIND_SOURCES).length;
           // return this.getSourcesInRoom().length;
        },
        enumerable: false,
        configurable: true
    }),

    Object.defineProperty(Room.prototype, "source1FlagName", {
        get: function () {

            var source1Flag = this.find(FIND_FLAGS, {filter: (s: { name: string; })=> s.name.startsWith("Source_"+ this.name) || s.name.startsWith("Source1_"+ this.name) })[0];
          ///  return "Source_W7N4";
           // console.log('<font color = "green">[' + fileName + '] xxxxxxxxxxxxxxxxxxxxx source1Flag.name is ' + source1Flag.name  + '</>');

            if (source1Flag) {
                return source1Flag.name;
            }
            else{
                return undefined;
            }

        },
        enumerable: false,
        configurable: true
    }),


    Object.defineProperty(Room.prototype, "source2FlagName", {
        get: function () {
     //       return "Source2_W7N4";
            var source2Flag = this.find(FIND_FLAGS, {filter: (s: { name: string | string[]; })=> s.name.includes("Source2_"+ this.name) })[0];
            if (source2Flag == undefined) {
                return undefined;
            }
          //  console.log('<font color = "green">[' + fileName + '] xxxxxxxxxxxxxxxxxxxxx source2Flag.name is ' + source2Flag.name  + '</>');

            if (source2Flag) {
              //  console.log('<font color = "green">[' + fileName + '] xxxxxxxxxxxxxxxxxxxxx source2Flag.name is ' + source2Flag.name  + '</>');
                return source2Flag.name;
            }
            else{
                console.log('<font color = "red">[' + fileName + '] xxxxxxxxxxxxxxxxxxxxx source2Flag is missing there maybe not be two sources in room: ' + source2Flag  + '</>');
                return undefined;
            }

        },
        enumerable: false,
        configurable: true
    }),

   // this.room.hostileCreepsInRoom();



    Object.defineProperty(Room.prototype, "invaderCount", {

        get: function () {

            let invaders = this.find(FIND_HOSTILE_CREEPS);

            if (invaders == undefined) {
                return 0;

            }



            if (invaders != undefined) {
                return invaders.length;

            }


            // Memory[this.name].invaderCount = this.find(FIND_HOSTILE_CREEPS).length
            // //Memory[this.name].invaderCount = 1;
            // if (condition) {

            // }


            // if (Memory[this.name].invaderCount != undefined) {
            //     return Memory[this.name].invaderCount;
            // }
            // else {
            //     return undefined;
            // }
            return 0;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Room.prototype, "maxRampartsHits", {

        get: function () {

            return this._maxRampartsHits;

        },

        set: function(maxRampartsHits){
            this._maxRampartsHits =  maxRampartsHits;
        },
        enumerable: true,
        configurable: true
    });


    Room.prototype.LineNumber = function(){
        var e = new Error();
        if (!e.stack)
            try {
                // IE requires the Error to actually be throw or else the Error's 'stack'
                // property is undefined.
                throw e;
            } catch (e: any) {
                if (e.stack) {
                    return 0; // IE < 10, likely
                }
            }
        var stack = e.stack!.toString().split(/\r\n|\n/);
        // We want our caller's frame. It's index into |stack| depends on the
        // browser and browser version, so we need to search for the second frame:
        var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
        do {
            var frame = stack.shift();
        } while (!frameRE.exec(frame!) && stack.length);
        return frameRE.exec(stack.shift()!)![1];

        //return this.pad(frameRE.exec(stack.shift())[1], 4);
    }


    // Room.prototype.LineNumber = function (num: string, size: number) {
    //     var s = "000000000" + num.toString();
    //     return s.substr(s.length - size);
    // }

    Room.prototype.getConstructionSites = function(){

        const constructionSites = this.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites == undefined) {
            return undefined
        }

        return constructionSites;

    }

    Object.defineProperty(Room.prototype, "constructionSiteCount", {

        get: function () {


            const constructionSites = this.getConstructionSites()
            if (constructionSites == undefined) {
                return undefined;
            }

            return constructionSites.length;
        },
        enumerable: true,
        configurable: true
    });

//}
