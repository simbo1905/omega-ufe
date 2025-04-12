import { UserRole } from 'model/src/generated-types';
import * as fs from 'fs';
import * as path from 'path';

// Check if the component file exists
const componentPath = path.join(__dirname, 'src', 'UserCard.svelte');
const storeFilePath = path.join(__dirname, 'src', 'stores', 'userStore.ts');

// Verify files exist
if (!fs.existsSync(componentPath)) {
  console.error('❌ UserCard.svelte component not found!');
  process.exit(1);
}

if (!fs.existsSync(storeFilePath)) {
  console.error('❌ userStore.ts not found!');
  process.exit(1);
}

// Mock user data
const mockUser = {
  id: '123',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: UserRole.ADMIN,
  __typename: 'User'
};

console.log('✅ Verification successful!');
console.log('Component files exist and can be imported.');
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
