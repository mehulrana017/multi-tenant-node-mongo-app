import express, { Router } from 'express';
import {
  createTenant,
  getTenant,
  getTenantData,
} from '../controllers/tenantController';

const router: Router = express.Router();

/**
 * Route to create a new tenant
 */
router.post('/tenants', createTenant);

/**
 * Route to get a tenant by ID
 */
router.get('/tenants/:tenantId', getTenant);

/**
 * Route to get tenant-specific data
 */
router.get('/tenants/:tenantId/data', getTenantData);

export default router;
