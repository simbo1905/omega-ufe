import { type User, UserRole } from 'model';

export class DataAccessClient {
  async fetchUser(id: string): Promise<User> {
    // Mock implementation for testing
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.USER
    };
  }

  async fetchAllUsers(): Promise<User[]> {
    // Mock implementation for testing
    return [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: UserRole.USER },
      { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: UserRole.ADMIN },
      { id: '3', name: 'Bob Doe', email: 'bob.doe@example.com', role: UserRole.GUEST }
    ];
  }
}

export function logUser(user: User): void {
  console.log(`User ${user.id}: ${user.name}`);
}
