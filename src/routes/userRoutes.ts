import express, { Router } from 'express';
import {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
} from '../controllers/userController';

const router: Router = express.Router();

/**
 * Route to register a new user for a tenant
 */
router.post('/tenants/:tenantId/users', registerUser);

/**
 * Route for user login
 */
router.post('/tenants/:tenantId/users/login', loginUser);

/**
 * Route to get user details
 */
router.get('/tenants/:tenantId/users/:userId', getUser);

/**
 * Route to list all users for a tenant
 */
router.get('/tenants/:tenantId/users', getAllUsers);

export default router;
