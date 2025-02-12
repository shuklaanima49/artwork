export interface User {
    id: string;
    username: string;
    passwordHash: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;  
    metadata: UserMetadata;
  }
  
  export interface UserMetadata {
    name?: string;
    avatar_url?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  }
