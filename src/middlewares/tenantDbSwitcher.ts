import { Request, Response, NextFunction } from 'express';
import connectToTenantDatabase from '../config/dbSwitcher';

/**
 * Middleware to switch the database connection dynamically for each tenant.
 */
const tenantDbSwitcher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tenantId = req.headers['tenant-id']; // Assuming tenantId is passed in headers
    if (!tenantId) {
      return res.status(400).json({ message: 'Tenant ID is required' });
    }

    await connectToTenantDatabase(tenantId.toString());
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).json({
      message: 'Error switching tenant database',
      error: error,
    });
  }
};

export default tenantDbSwitcher;
