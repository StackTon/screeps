const roleLink = {
    run(link: StructureLink, room: Room) {
        if (link.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            const [link1, link2]: AnyStructure[] = room.find(FIND_STRUCTURES, {
                filter(structure: AnyStructure) {
                    return structure instanceof StructureLink;
                }
            });

            const currentLinkMemory = Memory.links[link.id];

            if (currentLinkMemory.role === 'transporter') {
                if (link.id !== link1.id && link1 instanceof StructureLink) {
                    link.transferEnergy(link1);
                } else if (link2 instanceof StructureLink) {
                    link.transferEnergy(link2);
                }
            }

        }
    }
};

export default roleLink;
