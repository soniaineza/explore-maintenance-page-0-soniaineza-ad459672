import * as migration_20260703_104002 from './20260703_104002';

export const migrations = [
  {
    up: migration_20260703_104002.up,
    down: migration_20260703_104002.down,
    name: '20260703_104002'
  },
];
