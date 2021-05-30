import { Record, String, Static, Number } from "runtypes";

export const PageCursor = Record({
  key: String.optional(),
  limit: Number.withConstraint((_) => _ > 0),
});

export type PageCursor = Static<typeof PageCursor>;

export class PageCursorExtensions {
  static newWithDefaulLimit = (key?: string): PageCursor => {
    return PageCursor.check({
      key,
      limit: 30,
    });
  };
}
