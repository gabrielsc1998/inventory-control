export interface IDGenerator {
  /**
   * Function called to generate an id
   *
   * @returns id as string
   *
   * @example
   *
   * const id: string = IDGenerator.generate();
   */
  generate: () => string;
}
