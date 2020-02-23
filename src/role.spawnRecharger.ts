const roleSpawnrecharger = {
    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            const storage = creep.room.storage
            if (storage && creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            const spawnAndExtentions: AnyStructure[] | undefined = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: AnyStructure) => {
                    return (structure instanceof StructureExtension ||
                        structure instanceof StructureSpawn ||
                        structure instanceof StructureTower) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (spawnAndExtentions.length > 0 && creep.transfer(spawnAndExtentions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawnAndExtentions[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

export default roleSpawnrecharger;
