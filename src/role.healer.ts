const roleHealer = {
    run(creep: Creep, fighers: Creep[]) {

        for (const figher of fighers) {
            if (figher.hitsMax > figher.hits) {
                if (creep.heal(figher) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(figher, { visualizePathStyle: { stroke: '#ffaa00' } });
                    return;
                }
            }
        }

        creep.moveTo(new RoomPosition(36, 40, 'W14S24'), { visualizePathStyle: { stroke: '#ffaa00' } });

    }
};

export default roleHealer;
