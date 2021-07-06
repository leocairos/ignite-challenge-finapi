import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (
  //host = 'database',
  testEnv = false,
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      //host: testEnv ? 'localhost' : host,
      database: testEnv ? 'finapiv2_test' : defaultOptions.database,
    }),
  );
};
