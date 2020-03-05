// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  working: boolean;
  sourceId: string;
}

interface LinkType {
  role: string,
  id: string
}

interface Memory {
  uuid: number;
  log: any;
  links: { [linkId: string]: LinkType };
}
