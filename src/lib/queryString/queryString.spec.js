const { queryString } = require("./querystring");

describe("Object to query string", () => {
  it("create a valid query string when an object is provided", () => {
    const obj = {
      name: "Raziel",
      profession: "fighter",
    };

    expect(queryString(obj)).toBe("name=Raziel&profession=fighter");
  });
});
