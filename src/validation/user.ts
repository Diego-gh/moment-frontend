import { z } from 'zod';

// Constants
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 64;
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 32;
export const DISPLAY_NAME_MIN_LENGTH = 2;
export const DISPLAY_NAME_MAX_LENGTH = 32;
export const EMAIL_MAX_LENGTH = 254;

// Common validation rules
const email = z.string().email();
const password = z
  .string()
  .trim()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH);
const username = z
  .string()
  .trim()
  .min(USERNAME_MIN_LENGTH)
  .max(USERNAME_MAX_LENGTH)
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores.'
  );
const displayName = z
  .string()
  .trim()
  .min(DISPLAY_NAME_MIN_LENGTH)
  .max(DISPLAY_NAME_MAX_LENGTH)
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Display name can only contain letters, numbers, and underscores.'
  );

// Schemas
export const registerUserSchema = z.object({
  displayName,
  username,
  email,
  password,
});

export const loginUserSchema = z.object({
  email,
  password,
});

// Type definitions
export type RegisterUserInputType = z.infer<typeof registerUserSchema>;
export type LoginUserInputType = z.infer<typeof loginUserSchema>;
