import dotenv from 'dotenv';

dotenv.config();

/**
 * Generates the MongoDB connection URI for a specific tenant using environment variables.
 * @param tenantName - The tenant's name used to dynamically set the database name.
 * @returns The complete MongoDB URI for connecting to the tenant's database.
 */
const getMongoUri = (tenantName: string): string => {
  if (!tenantName) {
    throw new Error('Tenant name is required to generate the MongoDB URI');
  }

  // Extract the parts of the URI from the environment variable
  const clusterUrl = process.env.MONGO_CLUSTER_URL || '';
  const user = process.env.MONGO_USER || '';
  const password = process.env.MONGO_PASSWORD || '';

  if (!clusterUrl || !user || !password) {
    throw new Error(
      'Missing MongoDB credentials in the environment variables.',
    );
  }

  // Construct the MongoDB URI dynamically using the tenant name
  const dbUri = `mongodb+srv://${user}:${password}@${clusterUrl}/${tenantName.toLowerCase()}_db?retryWrites=true&w=majority&appName=Cluster0`;

  return dbUri;
};

export default getMongoUri;
