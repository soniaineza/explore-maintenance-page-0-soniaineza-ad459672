import * as migration_20260703_104002 from './20260703_104002';
import * as migration_20260713_070800 from './20260713_070800';

export const migrations = [
  {
    up: migration_20260703_104002.up,
    down: migration_20260703_104002.down,
    name: '20260703_104002'
  },
  {
    up: migration_20260713_070800.up,
    down: migration_20260713_070800.down,
    name: '20260713_070800'
  },
];
