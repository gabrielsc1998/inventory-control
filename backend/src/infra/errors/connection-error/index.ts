export class ConnectionError extends Error {
  constructor(entity: string) {
    super(`Error connecting to the ${entity}`);
    this.name = "ConnectionError";
  }
}
