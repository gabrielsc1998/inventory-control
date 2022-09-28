import { ProductRepositoryInMemory } from "..";

describe("test", () => {
  it("ttt", async () => {
    const repo = new ProductRepositoryInMemory();
    for (let i = 0; i < 10; i++) {
      await repo.create({
        id: String(i),
        name: `name-${i}`,
        quantity: i,
        categoryId: i < 5 ? "1" : "2",
      });
    }

    // console.log(
    //   await repo.findAll({
    //     // pagination: {
    //     //   // page: 0,
    //     //   size: 2,
    //     // },
    //     filters: {
    //       // categoryId: "1",
    //       name: "name-3",
    //     },
    //   })
    // );
  });
});
