const roleLinkTransporter = {

    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            // const storage: StructureStorage | undefined = creep.room.storage;
            // if (storage && creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //     creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
            // }
            const controller: StructureController | undefined = creep.room.controller;
            if (controller && creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            const link: AnyStructure[] | null = creep.room.find(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure.id === '5e56c4b259c10313329b93ed';
                }
            });
            if (link.length === 1 && creep.withdraw(link[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(link[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
};

export default roleLinkTransporter;
