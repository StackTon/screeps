const roleTower = {
    run: function (tower: StructureTower, room: Room) {
        const hostileCreeps = room.find(FIND_HOSTILE_CREEPS);

        if (hostileCreeps.length > 0) {
            tower.attack(hostileCreeps[0]);
        } else {
            const myStructures = room.find(FIND_MY_STRUCTURES, {
                filter: structure => {
                    return structure.hitsMax > structure.hits;
                }
            });

            myStructures.sort((a, b) => a.hits - b.hits);

            if (myStructures.length > 0) {
                tower.repair(myStructures[0]);
            } else {
                const myCreeps = room.find(FIND_MY_CREEPS, {
                    filter: creep => {
                        if (creep.hits >= creep.hitsMax) {
                            return false;
                        }

                        return true;
                    }
                });

                if (myCreeps.length > 0) {
                    tower.heal(myCreeps[0]);
                } else {
                    // const roads = room.find(FIND_STRUCTURES, {
                    //     filter: structure => {
                    //         return structure.structureType === STRUCTURE_ROAD && structure.hitsMax > structure.hits;
                    //     }
                    // });

                    // roads.sort((a, b) => a.hits - b.hits);

                    // if (roads.length > 0) {
                    //     tower.repair(roads[0]);
                    // }
                }
            }
        }
    }
};

export default roleTower;
