import 'ts-polyfill/lib/es2019-array';

import { Kernel } from 'kernel/Kernel';
import { ErrorMapper } from 'utils/ErrorMapper';
import * as processes from 'processes';
import { Init } from 'processes';
import { ScreepsROM } from 'kernel/memory';
import { ScreepsLogger } from 'Logger';

const kernel = new Kernel({
  Init,
  processes: Object.values(processes),
  rom: ScreepsROM,
  loggerFactory: (name) => new ScreepsLogger(name),
});

// @ts-ignore: to use ps in console
global.ps = (pid?: number) => {
  return kernel.ps(pid);
};

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  kernel.run();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
