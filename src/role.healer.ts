const roleHealer = {
    run(creep: Creep, fighers: Creep[]) {
        let isHealing = false;

        for (let i = 0; i < Object.values(fighers).length; i++) {
            const figher = Object.values(fighers)[i];
            if (figher.hitsMax > figher.hits) {
                isHealing = true;
                if (creep.heal(figher) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(figher, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }

        if (!isHealing) {
            creep.moveTo(new RoomPosition(36, 40, 'W14S24'), { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
};

export default roleHealer;
