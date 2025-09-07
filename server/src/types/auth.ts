declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export type RegisterRequest = {
    username: string, 
    email: string,
    password: string
}

export type LoginRequest = {
    username: string,
    email: string,
    password: string
}