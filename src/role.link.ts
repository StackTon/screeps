const roleLink = {
    run(currnetLink: StructureLink, room: Room) {
        if (currnetLink.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            const links: AnyStructure[] = room.find(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure instanceof StructureLink;
                }
            });

            const currentLinkMemory = Memory.links[currnetLink.id];

            if (currentLinkMemory.role === 'transporter') {
                for (const linkId in Memory.links) {
                    if (Memory.links.hasOwnProperty(linkId)) {
                        const element = Memory.links[linkId];

                        if (element.role === 'upgradeReceiver') {
                            for (const link of links) {
                                if (link.id === linkId && link instanceof StructureLink) {
                                    currnetLink.transferEnergy(link);
                                }
                            }
                        }

                    }
                }
            }

        }
    }
};

export default roleLink;
