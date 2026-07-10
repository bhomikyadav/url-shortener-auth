import 'express';

declare global {
  namespace Express {
    interface Request {
      requestId: string | undefined;
      refreshToken: string | undefined;
    }
  }
}
