export interface CheckIfExistCategory {
  execute(
    input: CheckIfExistCategory.Input
  ): Promise<CheckIfExistCategory.Output>;
}

export namespace CheckIfExistCategory {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}
