declare namespace Express {
  interface Request {
    user: {
      uid: string;
      email?: string;
    };
  }
}
