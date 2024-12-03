import { NextFunction, Request, Response } from 'express';
import Tenant from '../models/tenantModel';
import connectToTenantDatabase from '../config/dbSwitcher';

/**
 * Create a new tenant
 */
export const createTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { name, email } = req.body;

  try {
    // Check if tenant already exists
    const existingTenant = await Tenant.findOne({ email });
    if (existingTenant) {
      res
        .status(400)
        .json({ message: 'Tenant with this email already exists.' });
      return;
    }

    // Create new tenant
    const tenant = new Tenant({ name, email });
    await tenant.save();

    res.status(201).json({ message: 'Tenant created successfully', tenant });
  } catch (error) {
    next(error);
  }
};

/**
 * Get tenant by ID
 */
export const getTenant = async (req: Request, res: Response): Promise<void> => {
  const { tenantId } = req.params;

  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      res.status(404).json({ message: 'Tenant not found' });
      return;
    }

    res.status(200).json({ tenant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tenant details' });
  }
};

/**
 * Fetch tenant-specific data by connecting to their database
 */
export const getTenantData = async (req: Request, res: Response) => {
  const { tenantId } = req.params;

  try {
    // Connect to tenant-specific database
    await connectToTenantDatabase(tenantId);

    res
      .status(200)
      .json({ message: `Connected to tenant ${tenantId}'s database` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to tenant database' });
  }
};
