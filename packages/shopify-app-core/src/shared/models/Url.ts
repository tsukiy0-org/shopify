import { String, Static } from "runtypes";

export const Url = String.withConstraint((_) => {
  try {
    new URL(_);
    return true;
  } catch (err) {
    return false;
  }
});

export type Url = Static<typeof Url>;
