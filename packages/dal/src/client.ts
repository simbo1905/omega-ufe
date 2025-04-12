import { User, UserRole } from 'model';

/**
 * Data Access Layer client for handling GraphQL operations
 */
export class DataAccessClient {
  /**
   * Simulates fetching a user from a GraphQL API
   */
  async fetchUser(id: string): Promise<User> {
    // This would normally be a GraphQL query
    console.log(`Fetching user with ID: ${id}`);
    
    // Return mock data that matches our User type from the model
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.USER
    };
  }

  /**
   * Simulates fetching all users from a GraphQL API
   */
  async fetchAllUsers(): Promise<User[]> {
    // This would normally be a GraphQL query
    console.log('Fetching all users');
    
    // Return mock data that matches our User[] type from the model
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: UserRole.USER
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: UserRole.ADMIN
      },
      {
        id: '3',
        name: 'Guest User',
        email: 'guest@example.com',
        role: UserRole.GUEST
      }
    ];
  }
}
