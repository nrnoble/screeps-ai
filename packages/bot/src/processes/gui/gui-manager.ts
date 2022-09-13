import { createProcess, exit, sleep, spawn } from 'kernel';
import { getRoomPlan } from '../../library/room';
import { objectEntries } from '../../utils';

export const roomVisuals = createProcess(function* (roomName: string) {
  for (;;) {
    const plan = getRoomPlan(roomName);
    const room = Game.rooms[roomName];
    if (!room) {
      return exit(`No vision on room ${roomName}`);
    }

    // DT visuals
    for (let x = 0; x <= 49; ++x) {
      for (let y = 0; y <= 49; ++y) {
        const dist = plan.distanceTransform.get(x, y);
        if (dist === 0) {
          continue;
        }
        room.visual.text(dist.toString(), x, y);
        room.visual.rect(x - 0.5, y - 0.5, 1, 1, {
          fill: `hsl(${200 + dist * 10}, 100%, 60%)`,
          opacity: 0.4,
        });
      }
    }

    for (const [type, positions] of objectEntries(plan.structures)) {
      positions.forEach(({ x, y }, index) => {
        room.visual.structure(x, y, type, { opacity: 0.5 });
      });
    }
    room.visual.connectRoads();
    const visuals = room.visual.export();

    yield* sleep();
    while (getRoomPlan(roomName).lastChange === plan.lastChange) {
      room.visual.import(visuals);

      yield* sleep();
    }
  }
});

export const guiManager = createProcess(function* () {
  for (;;) {
    for (const flag of Object.values(Game.flags)) {
      if (flag.name !== 'visuals') {
        continue;
      }
      if (flag.room) {
        yield* spawn('roomVisuals', undefined, flag.room.name);
      }
      flag.remove();
    }
    yield* sleep();
  }
});
