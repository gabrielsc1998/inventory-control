import { Pagination } from "@/domain/contracts/gateways/pagination";

import { PaginationGateway } from "..";

const mockPagination = {
  page: 1,
  size: 10,
};

type SUT = {
  pagination: Pagination;
};

const makeSut = (): SUT => {
  const pagination = PaginationGateway;

  return {
    pagination,
  };
};

let sut: SUT = null;

describe("Pagination [ Gateway ]", () => {
  beforeAll(() => (sut = makeSut()));

  it("should return a correct pagination object", () => {
    const output = sut.pagination.create(mockPagination);
    expect(output).toMatchObject({
      offset: mockPagination.page - 1,
      limit: mockPagination.size,
    });
  });

  it("should return offset and limit as zero when pass a void object", () => {
    const output = sut.pagination.create({});
    expect(output).toMatchObject({
      offset: 0,
      limit: 0,
    });
  });

  it("should return offset and limit as zero when not pass data", () => {
    const output = sut.pagination.create();
    expect(output).toMatchObject({
      offset: 0,
      limit: 0,
    });
  });

  it("should return offset and limit as zero when pass a invalid page and size", () => {
    const output = sut.pagination.create({ page: -1, size: undefined });
    expect(output).toMatchObject({
      offset: 0,
      limit: 0,
    });
  });

  it("should return offset and limit as zero when pass a invalid page and size", () => {
    const output = sut.pagination.create({ page: undefined, size: -1 });
    expect(output).toMatchObject({
      offset: 0,
      limit: 0,
    });
  });
});
