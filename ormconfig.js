const devDbConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.js'],
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

const testDbConfig = {
  type: 'sqlite',
  database: 'test.sqlite',
  entities: ['**/*.entity.ts'],
  synchronize: false,
  cli: {
    migrationsDir: 'migrations',
  },
  migrationsRun: true,
};

const prodDbConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.js'],
  synchronize: false,
  cli: {
    migrationsDir: 'migrations',
  },
};

const getDbConnfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return devDbConfig;
    case 'test':
      return testDbConfig;
    case 'production':
      return prodDbConfig;
    default:
      throw new Error('Unknown Environment');
  }
};

module.exports = getDbConnfig();
