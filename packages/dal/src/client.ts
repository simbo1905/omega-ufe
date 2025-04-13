// import { type User, UserRole } from './__tests__/model-mock';
import { type User, type UserRole } from '../../model/src';

export class DataAccessClient {
  async fetchUser(id: string): Promise<User> {
    // Mock implementation for testing
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'USER' as UserRole
    };
  }

  async fetchAllUsers(): Promise<User[]> {
    // Mock implementation for testing
    return [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'USER' as UserRole },
      { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'ADMIN' as UserRole },
      { id: '3', name: 'Bob Doe', email: 'bob.doe@example.com', role: 'GUEST' as UserRole }
    ];
  }
}

export function logUser(user: User): void {
  console.log(`User ${user.id}: ${user.name}`);
}
