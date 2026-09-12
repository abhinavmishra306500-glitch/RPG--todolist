export type UserRole = 'player' | 'developer';

export interface LoginFormData {
  identifier: string; // username or email
  password: string;
  rememberMe?: boolean;
}

export interface AuthMockSession {
  role: UserRole;
  identifier: string;
  timestamp: string;
  intendedAccess: string[];
}
