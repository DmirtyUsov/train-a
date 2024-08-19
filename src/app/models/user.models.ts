export enum UserRole {
    Manager = 'manager',
    User = 'user'
  }
  
export interface UserProfile {
    name: string;
    email: string;
    role: UserRole;
}
