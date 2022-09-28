export class ValueObject<ErrorInstance> {
  error?: ErrorInstance;

  get invalid(): boolean {
    return Boolean(this.error);
  }

  getError(): ErrorInstance | undefined {
    return this.error;
  }
}
