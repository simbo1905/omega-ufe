import { DataAccessClient } from '../client';
import { type User, type UserRole } from 'model';

describe('DataAccessClient', () => {
  let client: DataAccessClient;

  beforeEach(() => {
    client = new DataAccessClient();
  });

  test('fetchUser returns a User object with the correct structure', async () => {
    const user = await client.fetchUser('1');
    
    expect(user).toBeInstanceOf(Object);
    expect(user.id).toBe('1');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.role).toBe(UserRole.USER);
  });

  test('fetchAllUsers returns an array of User objects', async () => {
    const users = await client.fetchAllUsers();
    
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    
    users.forEach(user => {
      expect(user).toBeInstanceOf(Object);
      expect(user.id).toHaveLength(1);
      expect(user.name).toContain('Doe');
      expect(user.email).toContain('@example.com');
      expect(Object.values(UserRole)).toContain(user.role);
    });
  });

  test('UserRole is correctly typed', () => {
    expect(UserRole).toEqual({
      ADMIN: 'ADMIN',
      GUEST: 'GUEST',
      USER: 'USER'
    });
  });
});
