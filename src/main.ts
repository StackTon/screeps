import { ErrorMapper } from "utils/ErrorMapper";

import roleHarvester from 'role.harvester';
import roleUpgrader from 'role.upgrader';
import roleTower from 'role.tower';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const currentRoom = Game.rooms['W13S24'];

  const { energyCapacityAvailable } = currentRoom;

  const creepSkills: any[] = [];

  for (let i = 0; i < energyCapacityAvailable / 200; i++) {
    creepSkills.push(MOVE, WORK, CARRY);
  }

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');

  const [source1, source2] = Game.rooms["W13S24"].find(FIND_SOURCES);

  if (harvesters.length < 2) {
    const newName = 'H' + Game.time;
    Game.spawns['Spawn1'].spawnCreep(creepSkills, newName,
      { memory: { role: 'harvester', sourceId: source2.id, working: true } });
  }

  if (upgraders.length < 3) {
    const newName = 'U' + Game.time;
    Game.spawns['Spawn1'].spawnCreep(creepSkills, newName,
      { memory: { role: 'upgrader', sourceId: source1.id, working: true } });
  }

  const towers: AnyStructure[] | undefined = currentRoom.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_TOWER)
    }
  });

  if (towers) {
    for (const tower of towers) {
      if (tower instanceof StructureTower) {
        roleTower.run(tower, currentRoom);
      }
    }

  }


  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === 'harvester' || creep.memory.role === 'harvesterOther') {
      roleHarvester.run(creep);
    } else if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }
  }
});
