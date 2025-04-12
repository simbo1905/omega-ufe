import { type User } from 'model';

export function logUser(user: User): void {
  console.log(`User ${user.id}: ${user.name}`);
}
