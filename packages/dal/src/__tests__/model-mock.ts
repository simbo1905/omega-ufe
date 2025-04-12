// Mock implementation of the model types for testing
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}
