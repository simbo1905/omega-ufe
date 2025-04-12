// Simple verification script for the UserCard component
import * as fs from 'fs';
import * as path from 'path';

// Define mock user data
const mockUser = {
  id: '123',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'ADMIN',
  __typename: 'User'
};

// Check if the component file exists
const componentPath = path.resolve('./src/UserCard.svelte');
const storeFilePath = path.resolve('./src/stores/userStore.ts');

// Verify files exist
console.log('Verifying component files...');

if (fs.existsSync(componentPath)) {
  console.log('✅ UserCard.svelte component found!');
} else {
  console.error('❌ UserCard.svelte component not found!');
  process.exit(1);
}

if (fs.existsSync(storeFilePath)) {
  console.log('✅ userStore.ts found!');
} else {
  console.error('❌ userStore.ts not found!');
  process.exit(1);
}

console.log('\n✅ Verification successful!');
console.log('Mock user data:');
console.log(mockUser);
console.log('\nTo use this component in a Svelte application:');
console.log(`
<script>
  import { UserCard } from 'mfe-home';
  import { users, addUser } from 'mfe-home';
  
  // Add a user to the store
  addUser({
    id: '123',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'ADMIN'
  });
</script>

{#each $users as user}
  <UserCard {user} />
{/each}
`);
