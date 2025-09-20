// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number;
    username: string | null;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    sex: string | null;
    premium: boolean;
    summit: boolean;
    created_at: string;
    updated_at: string; 
    badge_type_id: number;
    weight: number;
    profile_medium: string;
    profile: string;
    friend: null | any; 
    follower: null | any; 
  }

  interface UserSession {
    }

  interface SecureSessionData {
    apiToken: string,
    expiresAt: string,
    expiresIn: string, 
    refreshToken: string
  }
}

export {}
