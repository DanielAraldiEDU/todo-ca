export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing required parameter: ${param}`);
    this.name = 'MissingParamError';
  }
}
