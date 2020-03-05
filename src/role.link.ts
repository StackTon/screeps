const roleLink = {
    run(currnetLink: StructureLink, room: Room) {
        if (currnetLink.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            const links: AnyStructure[] = room.find(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure instanceof StructureLink;
                },
            });

            const currentLinkMemory = Memory.links[currnetLink.id];

            if (currentLinkMemory.role === 'transporter') {
                for (let i = 0; i < Object.values(Memory.links).length; i++) {
                    const link = Object.values(Memory.links)[i];
                    if (link.role === 'receiver') {
                        for (let j = 0; j < Object.values(links).length; j++) {
                            const element = Object.values(links)[i];
                            if (link.id === element.id && link instanceof StructureLink) {
                                currnetLink.transferEnergy(link);
                            }
                        }
                    }
                }
            }
        }
    },
};

export default roleLink;
