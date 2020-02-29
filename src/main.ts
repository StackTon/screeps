import { ErrorMapper } from "utils/ErrorMapper";

import roleHarvester from './role.harvester';
import roleUpgrader from './role.upgrader';
import roleTower from './role.tower';
import roleSpawnrecharger from './role.spawnRecharger';
import roleBuilder from './role.builder';
import roleLink from "./role.link";
import roleLinkTransporter from "./role.linkTransporter";
import roleFigher from "./role.figher";
import roleMineralHarvester from "./role.mineralHarvester";
import _ from "lodash";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
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
    const mineralHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'mineralHarvester');
    const spawnRechargers = _.filter(Game.creeps, (creep) => creep.memory.role === 'spawnRecharger');
    const spawnBuilers = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const linkTransporter = _.filter(Game.creeps, (creep) => creep.memory.role === 'linkTransporter');

    const [source1, source2] = currentRoom.find(FIND_SOURCES);

    const [mineral1] = currentRoom.find(FIND_MINERALS);

    const shouldSpanHarverster: boolean = harvesters.length < 1;
    const shouldSpanUpgrader: boolean = upgraders.length < 2;
    const shouldSpanMineralHarverster: boolean = mineralHarvesters.length < 1;
    const shouldSpawnspawnRecharger: boolean = spawnRechargers.length < 1;
    const shouldSpawnBuilder: boolean = spawnBuilers.length < 1;
    const shouldSpawnLinkTransporter: boolean = linkTransporter.length < 1;

    if (shouldSpanHarverster) {
        const newName = 'H' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'harvester', sourceId: source2.id, working: true } });
    }

    if (shouldSpanMineralHarverster) {
        const newName = 'U' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'mineralHarvester', sourceId: source1.id, working: true } });
    }

    if (shouldSpanUpgrader) {
        const newName = 'M' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'upgrader', sourceId: mineral1.id, working: true } });
    }

    if (shouldSpawnspawnRecharger) {
        const newName = 'SR' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, CARRY], newName,
            { memory: { role: 'spawnRecharger', sourceId: '', working: true } });
    }

    if (shouldSpawnBuilder) {
        const newName = 'B' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'builder', sourceId: '', working: true } });
    }

    if (shouldSpawnLinkTransporter) {
        const newName = 'LT' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK], newName,
            { memory: { role: 'linkTransporter', sourceId: '', working: true } });
    }


    const towers: AnyStructure[] | undefined = currentRoom.find(FIND_STRUCTURES, {
        filter(structure: AnyStructure) {
            return structure instanceof StructureTower;
        }
    });

    if (towers.length > 0) {
        for (const tower of towers) {
            if (tower instanceof StructureTower) {
                roleTower.run(tower, currentRoom);
            }
        }
    }

    const links: AnyStructure[] | undefined = currentRoom.find(FIND_STRUCTURES, {
        filter(structure: AnyStructure) {
            return structure instanceof StructureLink;
        }
    });
    if (links.length > 0) {
        for (const link of links) {
            if (link instanceof StructureLink) {
                roleLink.run(link, currentRoom);
            }
        }
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        const creepRole = creep.memory.role;
        if (creepRole === 'harvester') {
            roleHarvester.run(creep);
        } else if (creepRole === 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creepRole === 'spawnRecharger') {
            roleSpawnrecharger.run(creep);
        } else if (creepRole === 'builder') {
            roleBuilder.run(creep);
        } else if (creepRole === 'linkTransporter') {
            roleLinkTransporter.run(creep);
        } else if (creepRole === 'figher') {
            roleFigher.run(creep);
        } else if (creepRole === 'mineralHarvester') {
            roleMineralHarvester.run(creep);
        }
    }
});
