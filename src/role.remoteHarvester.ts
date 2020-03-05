const roleRemoteHarvester = {

    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            const source: Source | null = Game.getObjectById(creep.memory.sourceId);

            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            const buildingStructure: ConstructionSite[] | undefined = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (buildingStructure.length > 0) {
                if (creep.build(buildingStructure[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingStructure[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const roads: AnyStructure[] | undefined = creep.room.find(FIND_STRUCTURES, {
                    filter(structure: AnyStructure) {
                        return structure instanceof StructureRoad && structure.hitsMax > structure.hits;
                    },
                });

                if (roads.length > 0) {
                    if (creep.repair(roads[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(roads[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    const store: StructureStorage | null = Game.getObjectById('5e4da870a06360160e96d006');
                    if (store instanceof StructureStorage && creep.transfer(store, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(store, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    },
};

export default roleRemoteHarvester;
