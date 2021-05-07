import { RequestHandler, Request, Response } from "express";

export const promisifyHandler = <T>(
  p: (req: Request, res: Response) => Promise<T>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(p(req, res))
      .then((_) => next())
      .catch((_) => next(_));
  };
};
