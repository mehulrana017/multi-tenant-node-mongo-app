import { Request, Response } from 'express';
import User from '../models/userModel';
import connectToTenantDatabase from '../config/dbSwitcher';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Register a new user for a tenant
 */
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { tenantId } = req.params;
  const { username, email, password } = req.body;

  try {
    // Ensure tenantId exists in params
    if (!tenantId) {
      res.status(400).json({ message: 'Tenant ID is required' });
      return;
    }

    // Connect to tenant database
    await connectToTenantDatabase(tenantId);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists.' });
      return;
    }

    // Hash the password before saving it to the DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      tenantId,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Registering User' });
  }
};

/**
 * Log in an existing user for a tenant
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { tenantId } = req.params;
  const { email, password } = req.body;

  try {
    // Connect to tenant database
    await connectToTenantDatabase(tenantId);

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' },
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

/**
 * Get user details for a tenant
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { tenantId, userId } = req.params;

  try {
    // Connect to tenant database
    await connectToTenantDatabase(tenantId);

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

/**
 * List all users for a tenant
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { tenantId } = req.params;

  try {
    // Connect to tenant database
    await connectToTenantDatabase(tenantId);

    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
