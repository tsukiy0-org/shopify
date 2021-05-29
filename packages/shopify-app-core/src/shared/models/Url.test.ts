import { Url, UrlExtensions } from "./Url";

describe("Url", () => {
  const url = Url.check("https://pokemon.com/dex");

  describe("appendPath", () => {
    [
      {
        path: "1/2",
        expected: "https://pokemon.com/dex/1/2",
      },
      {
        path: "/1/2",
        expected: "https://pokemon.com/dex/1/2",
      },
      {
        path: "/1/2/",
        expected: "https://pokemon.com/dex/1/2/",
      },
    ].forEach(({ path, expected }) => {
      it("appends", () => {
        const actual = UrlExtensions.appendPath(url, path);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("appendQuery", () => {
    it("appends", () => {
      const query = {
        one: "one",
        two: "two",
      };

      const actual = UrlExtensions.appendQuery(url, query);

      expect(actual).toEqual("https://pokemon.com/dex?one=one&two=two");
    });
  });
});
