const roleBuilder = {
    run: function (creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            const tombStones: Tombstone[] | undefined = creep.room.find(FIND_TOMBSTONES, {
                filter: (tombStones: Tombstone) => {
                    return tombStones.store.getUsedCapacity() > 0;
                }
            });
            const dropperResouses: Resource[] = creep.room.find(FIND_DROPPED_RESOURCES);
            if (tombStones.length > 0) {
                if (creep.withdraw(tombStones[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombStones[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else if (dropperResouses.length > 0) {
                if (creep.pickup(dropperResouses[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropperResouses[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const storage = creep.room.storage;
                if (storage && creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            const buildingStructures: ConstructionSite[] | undefined = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (buildingStructures.length > 0) {
                if (creep.build(buildingStructures[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingStructures[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const roads: AnyStructure[] | undefined = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure: AnyStructure) => {
                        return structure instanceof StructureRoad && structure.hitsMax > structure.hits;
                    }
                });

                if (roads.length > 0 && creep.repair(roads[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(roads[0]);
                }
            }
        }
    }
};

export default roleBuilder;
