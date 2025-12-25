import { Request, ResponseToolkit } from "@hapi/hapi";

export function validationError(_request: Request, _h: ResponseToolkit, error: Error) {
  console.log(error);
  throw error;
}
