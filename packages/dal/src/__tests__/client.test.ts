import { DataAccessClient } from '../client';
import { UserRole } from '../../../model/src';

// Define role constants to use for tests
const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST'
};

// Simple test runner
async function runTests() {
  console.log('Running DataAccessClient tests...');
  
  const client = new DataAccessClient();
  
  // Test fetchUser
  console.log('\nTesting fetchUser:');
  const user = await client.fetchUser('1');
  console.log('User:', user);
  console.assert(user.id === '1', 'User ID should be 1');
  console.assert(user.name === 'John Doe', 'User name should be John Doe');
  console.assert(user.email === 'john.doe@example.com', 'User email should be correct');
  console.assert(user.role === ROLES.USER, 'User role should be USER');
  
  // Test fetchAllUsers
  console.log('\nTesting fetchAllUsers:');
  const users = await client.fetchAllUsers();
  console.log('Users count:', users.length);
  console.assert(Array.isArray(users), 'Result should be an array');
  console.assert(users.length > 0, 'Array should not be empty');
  
  for (const user of users) {
    console.assert(typeof user.id === 'string', 'User ID should be a string');
    console.assert(user.name.includes('Doe'), 'User name should contain Doe');
    console.assert(user.email.includes('@example.com'), 'User email should be valid');
    console.assert(Object.values(ROLES).includes(user.role), 'User role should be valid');
  }
  
  // Test UserRole values
  console.log('\nTesting UserRole values:');
  console.log('ROLES:', ROLES);
  console.assert(ROLES.ADMIN === 'ADMIN', 'ADMIN role should be correct');
  console.assert(ROLES.USER === 'USER', 'USER role should be correct');
  console.assert(ROLES.GUEST === 'GUEST', 'GUEST role should be correct');
  
  console.log('\nAll tests completed successfully!');
}

// Run the tests
runTests().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
