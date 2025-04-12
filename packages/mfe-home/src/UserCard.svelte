<script lang="ts">
  import { User } from 'model/src/generated-types';
  
  // Define the prop with its type
  export let user: User;
</script>

<div class="user-card">
  <h2 class="user-name">{user.name}</h2>
  <div class="user-details">
    <p class="user-email">Email: {user.email}</p>
    <p class="user-role">Role: {user.role}</p>
    <p class="user-id">ID: {user.id}</p>
  </div>
</div>

<style>
  .user-card {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
    max-width: 24rem;
  }
  
  .user-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }
  
  .user-details {
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .user-details p {
    margin: 0.25rem 0;
  }
  
  .user-email {
    color: #2b6cb0;
  }
  
  .user-role {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: #718096;
  }
</style>
