const { queryString, parse } = require("./querystring");

describe("Object to query string", () => {
  it("create a valid query string when an object is provided", () => {
    const obj = {
      name: "Raziel",
      profession: "fighter",
    };

    expect(queryString(obj)).toBe("name=Raziel&profession=fighter");
  });

  it("create a valid string even when an array", () => {
    const obj = {
      name: "Raziel",
      skills: ["Death Punch", "Makai Aura"],
    };

    expect(queryString(obj)).toBe("name=Raziel&skills=Death Punch,Makai Aura");
  });

  it("throw an error when an object is passed as value", () => {
    const obj = {
      name: "Raziel",
      skills: {
        firts: "Death Punch",
        second: "Makai Aura",
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe("Query string to object", () => {
  it("convert a query string to object", () => {
    const qs = "name=Raziel&profession=fighter";
    expect(parse(qs)).toEqual({
      name: "Raziel",
      profession: "fighter",
    });
  });

  it("convert a query string to an object taking care of coma saparated values", () => {
    const qs = "name=Raziel&skills=Death Punch,Makai Aura";

    expect(parse(qs)).toEqual({
      name: "Raziel",
      skills: ["Death Punch", "Makai Aura"],
    });
  });
});
