import { sleep, createProcess } from 'oscore';
import { expandPosition, isDefined } from '../utils';


const firstSpawn = Game.spawns.Spawn1!;
//const workerCount = firstSpawn.memory.workerCount;
const workerCount = 0;
const upgraderCount = 1;
const haulerCount = 2;
const hauler2Count = 0;

export const spawnManager = createProcess(function* () {
  const getSpawn = (): StructureSpawn => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Game.spawns['Spawn1']!;
  };

  const spawnHauler = () => {
    getSpawn().spawnCreep(
   //   [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    //  [CARRY, CARRY, CARRY,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE],
      `hauler-${Game.time}`
    );
  };

  const spawnHauler2 = () => {
    getSpawn().spawnCreep(
      [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    //  [CARRY, CARRY, CARRY,CARRY,CARRY, MOVE, MOVE, MOVE, MOVE],
      `hauler2-${Game.time}`
    );
  };

  const spawnSource1Miner = (slot: [number, number,string]) => {
   // getSpawn().spawnCreep([WORK, WORK, CARRY, MOVE], `miner-${Game.time}`, {
   // getSpawn().spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE,MOVE], `miner-${Game.time}`, {
      getSpawn().spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], `minerSource1-${Game.time}`, {
      memory: { slot },
    });
  };

  const spawnSource2Miner = (slot: [number, number,string]) => {
    // getSpawn().spawnCreep([WORK, WORK, CARRY, MOVE], `miner-${Game.time}`, {
    // getSpawn().spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE,MOVE], `miner-${Game.time}`, {
       getSpawn().spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE,MOVE,MOVE], `minerSource2-${Game.time}`, {
       memory: { slot },
     });
   };


  const spawnUpgrader = () => {
    getSpawn().spawnCreep(
   //  [WORK, CARRY, CARRY, MOVE, MOVE],
   // [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE,MOVE,MOVE,MOVE],
   // [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,MOVE,MOVE,MOVE],
   [WORK, WORK, WORK, WORK,WORK,WORK,WORK,WORK,WORK,WORK, CARRY, CARRY, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE],
      `upgrader-${Game.time}`
    );
  };

  const spawnWorker = () => {
    getSpawn().spawnCreep(
  //    [WORK, CARRY, CARRY, MOVE, MOVE],
      [WORK, WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY, CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
      `worker-${Game.time}`
    );
  };

  const spawnAttacker = () => {
    getSpawn().spawnCreep([MOVE, ATTACK], `attacker-${Game.time}`);
  };

  for (;;) {

  //  console.log("1Game.time " + Game.time);

    const spawn = getSpawn();
    if (spawn.spawning) {
      yield* sleep(spawn.spawning.remainingTime);
    }

    const sources = spawn.room.find(FIND_SOURCES);
    const terrain = spawn.room.getTerrain();
    const goal = spawn.pos;

    const slots = sources
      .map((source) =>
        expandPosition(source.pos)
          .filter(({ x, y }) => !(terrain.get(x, y) & TERRAIN_MASK_WALL))
          .sort((a, b) => {
            const adistx = Math.abs(goal.x - a.x);
            const bdistx = Math.abs(goal.x - b.x);
            const adisty = Math.abs(goal.y - a.y);
            const bdisty = Math.abs(goal.y - b.y);
            return adistx - bdistx + adisty - bdisty;
          })
          .slice(0, 3)
      )
      .flat();

   // console.log ("slots is " + slots);
   // console.log("2Game.time " + Game.time);


    const {
      miner: miners = [],
      hauler: haulers = [],
      hauler2: hauler2s = [],
      upgrader: upgraders = [],
      worker: workers = [],
      attacker: attackers = [],
    } = _.groupBy(Object.values(Game.creeps), (c) => c.name.split('-')[0]);

    const enemies = spawn.room.find(FIND_HOSTILE_CREEPS);
    //console.log("miners.length is " + miners.length);
    //console.log("slots.length is " + slots.length);
    //console.log("miners " + miners);
    // for (const miner in miners) {
    // console.log("miners " + miners);

    //   if (Object.prototype.hasOwnProperty.call(miners, miner)) {
    //     const element = miners[miner];

    //   }
    // }


    // if (attackers.length < enemies.length) {
    //   spawnAttacker();
    // }

    // else if (miners.length === 0) {
    //   const closestSlot = spawn.pos.findClosestByPath(slots);
    //   if (!closestSlot) {
    //     // TODO
    //     // this.logger.error('No source slot', spawn.room);
 //   //   }

   // //   else {
    //     // if ((closestSlot.x != 11 && closestSlot.y != 8) || (closestSlot.x != 45 && closestSlot.y != 5)) {

    //     // }

    //     spawnMiner([closestSlot.x, closestSlot.y,spawn.room.name]);

    //   }
    // }

    if (haulers.length === 0) {
      spawnHauler();
    }

   else if(firstSpawn.memory.spawnSource1Miner == true || firstSpawn.memory.spawnSource2Miner == true){

    // check if there is a Source1 creep
    if (firstSpawn.memory.spawnSource1Miner == true ) {
      firstSpawn.memory.spawnSource1Miner = false;
      spawnSource1Miner([10, 8,spawn.room.name]);
    }
    // check if there is a Source2 creep
    else if (firstSpawn.memory.spawnSource2Miner == true ) {
      firstSpawn.memory.spawnSource2Miner = false;
      spawnSource2Miner([45, 6,spawn.room.name]);
    }
   }


//     else if (miners.length < 1) {


//       const takenSlots = miners
//         .map((creep) => creep.memory.slot)
//         .filter(isDefined);

//         const freeSlots = slots.filter(
//         (pos) => !takenSlots.some(([x, y]) => pos.x === x && pos.y === y)
//       );


//       const freeSlot = spawn.pos.findClosestByPath(freeSlots);
//           console.log("FreeSlots is " + freeSlot)

//       if ( ((freeSlot!.x == 10 && freeSlot!.y == 8)
//          || (freeSlot!.x == 45 && freeSlot!.y == 6))) {
//           console.log("spawn miner is ");

//           spawnMiner([freeSlot!.x, freeSlot!.y,spawn.room.name]);
//       }

//       //   spawnMiner([freeSlot!.x, freeSlot!.y,spawn.room.name]);
// }


    else if (haulers.length < haulerCount) {
      spawnHauler();
    }

    else if (hauler2s.length < hauler2Count) {
      spawnHauler2();
    }

    else if ((upgraders.length < upgraderCount && spawn.room.controller) || spawn.memory.spawnUpgrader == true) {

      console.log("175 spawning an upgader")
      spawnUpgrader();
      if (spawn.memory.spawnUpgrader == true) {
        spawn.memory.spawnUpgrader = false;
      }

    } else if (workers.length < workerCount) {
      spawnWorker();
    }
    //yield* sleep(10);
    yield* sleep();
  }
});
