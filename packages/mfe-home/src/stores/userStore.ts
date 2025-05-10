import { writable } from 'svelte/store';
import { User } from 'model/src/generated-types';
import { produce } from 'immer';

// Create a typed writable store for User data
export const users = writable<User[]>([]);

// Function to add a user to the store
export function addUser(user: User): void {
  users.update(currentUsers => 
    produce(currentUsers, draft => {
      draft.push(user);
    })
  );
}

// Function to reset the store
export function resetUsers(): void {
  users.set([]);
}
