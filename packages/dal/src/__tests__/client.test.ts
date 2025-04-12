import { DataAccessClient } from '../client';
import { User, UserRole } from 'model';

describe('DataAccessClient', () => {
  let client: DataAccessClient;

  beforeEach(() => {
    client = new DataAccessClient();
  });

  test('fetchUser returns a User object with the correct structure', async () => {
    const user = await client.fetchUser('1');
    
    // Verify the returned object matches our User type
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
    
    // Verify the role is one of the enum values
    expect(Object.values(UserRole)).toContain(user.role);
  });

  test('fetchAllUsers returns an array of User objects', async () => {
    const users = await client.fetchAllUsers();
    
    // Verify we got an array
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    
    // Verify each user has the correct structure
    users.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
      expect(Object.values(UserRole)).toContain(user.role);
    });
  });

  test('UserRole enum has the expected values', () => {
    // Verify our enum from the model has the expected values
    expect(UserRole.ADMIN).toBeDefined();
    expect(UserRole.USER).toBeDefined();
    expect(UserRole.GUEST).toBeDefined();
  });
});
