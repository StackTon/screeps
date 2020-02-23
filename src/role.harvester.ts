const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            // const source: Source | null = Game.getObjectById(creep.memory.sourceId);

            const sources: Source[] | undefined = creep.room.find(FIND_SOURCES);

            if (sources) {
                if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        else {
            const spawnAndExtentions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: AnyStructure) => {
                    return (structure instanceof StructureExtension ||
                        structure instanceof StructureSpawn
                        // || structure instanceof StructureTower
                    )
                        &&

                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (spawnAndExtentions.length > 0) {
                if (creep.transfer(spawnAndExtentions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnAndExtentions[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const buildingStructures = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (buildingStructures.length) {
                    if (creep.build(buildingStructures[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildingStructures[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    const storage = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_STORAGE) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if (storage.length > 0) {
                        if (creep.transfer(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0], { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    } else {
                        const controller: StructureController | undefined = creep.room.controller;
                        if (controller && creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
        }
    }
};

export default roleHarvester;
