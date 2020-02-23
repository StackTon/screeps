const roleTower = {
    run(tower: StructureTower, room: Room) {
        const hostileCreeps: Creep[] = room.find(FIND_HOSTILE_CREEPS);

        if (hostileCreeps.length > 0) {
            tower.attack(hostileCreeps[0]);
        } else {
            const myCreeps: Creep[] = room.find(FIND_MY_CREEPS, {
                filter(creep: Creep) {
                    if (creep.hits >= creep.hitsMax) {
                        return false;
                    }
                    return true;
                }
            });

            if (myCreeps.length > 0) {
                myCreeps.sort((a, b) => a.hits - b.hits);
                tower.heal(myCreeps[0]);
            } else {
                const myStructures: AnyStructure[] | undefined = room.find(FIND_MY_STRUCTURES, {
                    filter(structure: AnyStructure) {
                        return structure.hitsMax > structure.hits;
                    }
                });

                if (myStructures.length > 0) {
                    myStructures.sort((a, b) => a.hits - b.hits);
                    tower.repair(myStructures[0]);
                }
            }
        }
    }
};

export default roleTower;
