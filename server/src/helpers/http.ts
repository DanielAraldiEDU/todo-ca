import { InternalServerError, MissingParamError } from '../errors';
import { HttpResponse } from '../protocols';

export function serverError(error: Error): HttpResponse {
  return {
    status: 500,
    body: new InternalServerError(error.message),
  };
}

export function badRequest(error: Error): HttpResponse {
  return {
    status: 400,
    body: error,
  };
}

export function ok(data: any): HttpResponse {
  return {
    status: 200,
    body: data,
  };
}

export function created(data: any): HttpResponse {
  return {
    status: 201,
    body: data,
  };
}

export function noContent(): HttpResponse {
  return {
    status: 204,
    body: null,
  };
}
