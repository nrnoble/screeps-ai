interface CreepMemory {
  slot?: [number, number,string];
  runTask?: boolean;
  renewSpawnName?: undefined;
  numberOfWorkParts?: undefined;
  pause?: boolean;
  ignoreRenew?: undefined;
 // parkItPos(parkItPos: any): any;
  gotoFlag?: any;
  containerUnderCreepId?: undefined;
  targetRoomName?: string;
  retreatFlagName?: string | undefined;
  renew?: boolean;
  workerCount?: number;
  spawnNewMinerTrigger?:string;
  spawnNewUpgraderTrigger?:string;
  maxWallHits?:number;

}
interface SpawnMemory{
  firstSpawn: StructureSpawn;
  spawnSource1Miner?: boolean | undefined;
  spawnSource2Miner?: boolean | undefined;
  spawnUpgrader?: boolean | undefined;
}


interface RoomMemory{
  [x: string]: any;
  source1ContainerId?: Id<_HasId>;
  source2ContainerId?: Id<_HasId>;

  source1LinkId?: Id<_HasId>;
  source2LinkId?:Id<_HasId>;

  source1Id?:Id<_HasId>;
  source2Id:Id<_HasId>;

  controllerLinkId?:Id<_HasId>;
  controllerContainerId?:Id<_HasId>;

  firstSpawnId?:Id<_HasId>;

  invaderCount?: number;
  source1SpawnId?: Id<_HasId>;
  source2SpawnId?: Id<_HasId>;

  maxWallHits?:number;



}

interface TowerMemory{
  needsEnergy: boolean;
}
