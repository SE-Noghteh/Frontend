/**
 * SAMPLE FILE
 *
 * Authentication-related API communication belongs here.
 */

import type {
  AuthResponse,
  LoginCredentials,
} from "@/types/Auth/authTypes";

export function login(
  credentials: LoginCredentials,
): Promise<AuthResponse | null> {
  void credentials;

  // Replace with a real API request.
  return Promise.resolve(null);
}

export function logout(): Promise<void> {
  // Replace with a real API request if required.
  return Promise.resolve();
}