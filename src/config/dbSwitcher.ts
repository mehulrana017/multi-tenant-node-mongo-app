import mongoose from 'mongoose';
import Tenant from '../models/tenantModel';
import getMongoUri from '../utils/getMongoUri';

/**
 * Dynamically connects to the MongoDB database for a specific tenant.
 * @param tenantId - The ID of the tenant for which to connect.
 */
const connectToTenantDatabase = async (tenantId: string): Promise<void> => {
  try {
    const tenant = await Tenant.findById(tenantId); // Get tenant details from master DB
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    // Get MongoDB URI using the helper file
    const dbUri = getMongoUri(tenant.name);

    // Check if the connection already exists
    const existingConnection = mongoose.connections.find(
      (conn) => conn.name === tenant.name.toLowerCase(),
    );

    if (existingConnection) {
      console.log(
        `✅ Already connected to ${tenant.name.toLowerCase()} database.`,
      );
      return; // Return early to avoid connecting again
    }

    // Create a new connection for the tenant's database
    const tenantDbConnection = mongoose.createConnection(dbUri, {
      dbName: tenant.name.toLowerCase(),
    });

    tenantDbConnection.once('open', () => {
      console.log(`✅ Connected to ${tenant.name.toLowerCase()} database.`);
    });

    // Optionally, you can save the connection in memory for later use
    // You can store it in a global map or object if needed
    // globalThis.connections[tenant.name.toLowerCase()] = tenantDbConnection;
  } catch (error) {
    console.error('❌ Error while connecting to tenant database:', error);
    throw error; // Propagate error for handling
  }
};

export default connectToTenantDatabase;
