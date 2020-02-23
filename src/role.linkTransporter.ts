const roleLinkTransporter = {

    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            const storage: StructureStorage | undefined = creep.room.storage;
            if (storage && creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            const link: AnyStructure | null = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure instanceof StructureLink;
                }
            });
            if (link && creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

export default roleLinkTransporter;
