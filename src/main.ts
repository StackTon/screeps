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
import roleHeaer from "./role.healer";
import roleRemoveHarvester from "./role.remoteHarvester";
import roleRemoveRepair from "./role.remoteRepair";
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

    const [source1, source2] = currentRoom.find(FIND_SOURCES);

    const [mineral1] = currentRoom.find(FIND_MINERALS);

    const creeps: any = {};

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        const creepRole = creep.memory.role;

        if (!creeps[creepRole]) {
            creeps[creepRole] = 0;
        }

        creeps[creepRole]++;
    }

    const figher = _.filter(Game.creeps, (creep) => creep.memory.role === 'figher');

    const shouldSpanHarverster: boolean = (creeps.harvester || 0) < 1;
    const shouldSpanUpgrader: boolean = (creeps.upgrader || 0) < 2;
    const shouldSpanMineralHarverster: boolean = (creeps.mineralHarvester || 0) < 1;
    const shouldSpawnspawnRecharger: boolean = (creeps.spawnRecharger || 0) < 2;
    const shouldSpawnBuilder: boolean = (creeps.builder || 0) < 1;
    const shouldSpawnLinkTransporter: boolean = (creeps.linkTransporter || 0) < 1;
    const shouldSpawnRemoteHarvester: boolean = (creeps.removeHarvester || 0) < 3;
    const shouldSpawnHealer: boolean = (creeps.healer || 0) < 1;
    const shouldSpawnFigher: boolean = (creeps.figher || 0) < 2;
    const shouldSpawnRemoteRepair: boolean = (creeps.remoteRepair || 0) < 1;

    if (shouldSpanHarverster) {
        const newName = 'H' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'harvester', sourceId: source2.id, working: true } });
    }

    if (shouldSpanMineralHarverster) {
        const source: Mineral[] | null = currentRoom.find(FIND_MINERALS);

        if (source.length > 0 && source[0].mineralAmount > 0) {
            const newName = 'M' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName,
                { memory: { role: 'mineralHarvester', sourceId: mineral1.id, working: true } });
        }
    }

    if (shouldSpanUpgrader) {
        const newName = 'U' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'upgrader', sourceId: source1.id, working: true } });
    }

    if (shouldSpawnspawnRecharger) {
        const newName = 'SR' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, CARRY, MOVE, CARRY, CARRY], newName,
            { memory: { role: 'spawnRecharger', sourceId: '', working: true } });
    }

    if (shouldSpawnBuilder) {
        const newName = 'B' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'builder', sourceId: '', working: true } });
    }

    if (shouldSpawnLinkTransporter) {
        const newName = 'LT' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK], newName,
            { memory: { role: 'linkTransporter', sourceId: '', working: true } });
    }

    if (!shouldSpawnFigher && shouldSpawnRemoteHarvester) {
        const newName = 'RH' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'removeHarvester', sourceId: '5bbcac1d9099fc012e634f61', working: true } });
    }

    if (!shouldSpawnFigher && shouldSpawnRemoteRepair) {
        const newName = 'R' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY], newName,
            { memory: { role: 'removeHarvester', sourceId: '5bbcac1d9099fc012e634f61', working: true } });
    }


    if (!shouldSpawnFigher && shouldSpawnHealer) {
        const newName = 'HE' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(
            [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL]
            , newName,
            { memory: { role: 'healer', sourceId: '', working: false } });
    }


    if (shouldSpawnFigher) {
        const newName = 'F' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(
            [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK]
            , newName,
            { memory: { role: 'figher', sourceId: '', working: false } });
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
        } else if (creepRole === 'healer') {
            roleHeaer.run(creep, figher);
        } else if (creepRole === 'removeHarvester') {
            roleRemoveHarvester.run(creep);
        } else if (creepRole === 'remoteRepair') {
            roleRemoveRepair.run(creep);
        }
    }
});
