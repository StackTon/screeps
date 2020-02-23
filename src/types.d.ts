// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  working: boolean;
  sourceId: string;
}

interface LinkType {
  role: string
}

interface Memory {
  uuid: number;
  log: any;
  links: { [linkId: string]: LinkType };
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
