const roleFigher = {

    run(creep: Creep) {
        const wallToDestroy: AnyStructure[] | undefined = creep.room.find(FIND_STRUCTURES, {
            filter(structure: AnyStructure) {
                return structure.pos.x === 2 && structure.pos.y === 19;
            }
        });

        if (creep.attack(wallToDestroy[0])) {
            creep.moveTo(wallToDestroy[0]);
        }

        const hostileCreep: Creep | null = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const hostileStructure: AnyStructure | null = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);

        if (hostileCreep && creep.attack(hostileCreep)) {
            creep.moveTo(hostileCreep);
        } else if (hostileStructure && creep.attack(hostileStructure)) {
            creep.moveTo(hostileStructure);
        }

    }
};

export default roleFigher;
