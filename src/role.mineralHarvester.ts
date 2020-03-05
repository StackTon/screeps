const roleHarvester = {

    run(creep: Creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
        }

        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
        }

        if (!creep.memory.working) {
            const source: Mineral | null = Game.getObjectById(creep.memory.sourceId);

            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            const terminal: AnyStructure | null = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure instanceof StructureTerminal;
                },
            });
            if (terminal && creep.transfer(terminal, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },
};

export default roleHarvester;
