import { String, Static } from "runtypes";
import { join } from "path";

export const Url = String.withConstraint((_) => {
  try {
    new URL(_);
    return true;
  } catch (err) {
    return false;
  }
});

export type Url = Static<typeof Url>;

export class UrlExtensions {
  static appendPath = (url: Url, path: string): Url => {
    const newUrl = new URL(url);
    newUrl.pathname = join(newUrl.pathname, path);
    return newUrl.toString();
  };

  static appendQuery = (url: Url, query: Record<string, string>): Url => {
    const newUrl = new URL(url);
    Object.entries(query).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value);
    });
    return newUrl.toString();
  };
}
