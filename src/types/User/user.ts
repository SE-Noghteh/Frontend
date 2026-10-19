/**
 * SAMPLE FILE
 *
 * Shared User domain types belong here.
 */

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}