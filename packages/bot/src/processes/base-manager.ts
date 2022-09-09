import { createProcess, exit, sleep } from 'oscore';
import { createLogger, ensureChild } from '../library';

const getRoom = (roomName: string): Room => {
  const room = Game.rooms[roomName];

  if (room === undefined) {
    return exit(`Room ${roomName} not found`);
  }

  return room;
};

const logger = createLogger('base-manager');

export const baseManager = createProcess(function* (roomName: string) {

  const room = getRoom(roomName)
  const spawns = room.find(FIND_MY_SPAWNS);
  let towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER && s.room.name ==  room.name) as StructureTower[] ;
  let invaders = room.find(FIND_HOSTILE_CREEPS) as AnyCreep[]

  if (invaders.length > 0) {

    let invader = invaders[0];
    for (let tower of towers) {
      tower.attack(invader as AnyCreep);
      yield* sleep();
    }

  }

  // for (let tower of towers) {

  //   //  tower.attack(invaderCreep);
  // }


  if (spawns.length === 0) {
    // TODO: We should recreate the base here.
    return;
  }

  for (;;) {
    yield* ensureChild('roomPlanner', undefined, roomName);
    yield* sleep(500);
  }
});
