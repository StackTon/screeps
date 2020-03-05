const roleHarvester = {

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
            const link: AnyStructure | null = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure instanceof StructureLink;
                },
            });
            if (link && creep.transfer(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
};

export default roleHarvester;
