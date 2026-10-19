/**
 * SAMPLE FILE
 *
 * Authentication-related types belong here.
 */

import type { User } from "@/types/User/user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}