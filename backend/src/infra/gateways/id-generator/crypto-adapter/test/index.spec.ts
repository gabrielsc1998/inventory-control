import crypto from "crypto";

import { IDGenerator } from "@/domain/contracts/gateways";

import { IDGeneratorCryptoAdapter } from "../../..";

type SUT = { idGenerator: IDGenerator };

const makeSut = (): SUT => {
  const idGenerator = IDGeneratorCryptoAdapter;
  return { idGenerator };
};

let sut: SUT = null;

describe("ID Generator Cryto Adapter [ Gateway ]", () => {
  beforeAll(() => (sut = makeSut()));

  it("should return a correct id", () => {
    const mockedId = "474a20f1-11af-42b5-a81b-b9df75e314d8";
    const spyRandomUUID = jest
      .spyOn(crypto, "randomUUID")
      .mockReturnValue(mockedId);
    const id = sut.idGenerator.generate();

    expect(spyRandomUUID).toHaveBeenCalled();
    expect(typeof id).toBe("string");
    expect(id).toEqual(mockedId);
  });
});
