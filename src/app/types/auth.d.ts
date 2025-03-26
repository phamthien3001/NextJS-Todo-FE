interface User {
    id: string;
    username: string;
    email: string;
    roles: string[];
  }
  
  interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }