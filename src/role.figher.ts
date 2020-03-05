const roleFigher = {

    run(creep: Creep) {
        const hostileCreeps: Creep[] | null = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
        if (hostileCreeps.length > 0) {
            if (creep.attack(hostileCreeps[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(hostileCreeps[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            creep.moveTo(new RoomPosition(37, 41, 'W14S24'), { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
};

export default roleFigher;
