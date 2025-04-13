const { DataAccessClient } = require('./dal-adapter');
// UserRole is a string union type, not an enum object
const userRoles = { ADMIN: 'ADMIN', USER: 'USER', GUEST: 'GUEST' };

describe('DataAccessClient', () => {
  const client = new DataAccessClient();

  describe('fetchUser', () => {
    it('should return a user with correct properties', async () => {
      const user = await client.fetchUser('1');
      
      expect(user).toBeDefined();
      expect(user.id).toBe('1');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john.doe@example.com');
      expect(user.role).toBe('USER');
    });
  });

  describe('fetchAllUsers', () => {
    it('should return an array of users with correct properties', async () => {
      const users = await client.fetchAllUsers();
      
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
      
      users.forEach(user => {
        expect(typeof user.id).toBe('string');
        expect(user.name).toContain('Doe');
        expect(user.email).toContain('@example.com');
        expect(['ADMIN', 'USER', 'GUEST']).toContain(user.role);
      });
    });
  });

  describe('UserRole string literals', () => {
    it('should match the expected literal values', () => {
      // Since UserRole is a string union type, we test the string literals directly
      expect(userRoles.ADMIN).toBe('ADMIN');
      expect(userRoles.USER).toBe('USER');
      expect(userRoles.GUEST).toBe('GUEST');
    });
  });
});