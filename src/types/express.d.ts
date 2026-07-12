import 'express';

interface UserT {
  sub: string;
  name: string;
}
declare global {
  namespace Express {
    interface Request {
      requestId: string | undefined;
      refreshToken: string | undefined;
      user: UserT | undefined;
    }
  }
}

export {};
