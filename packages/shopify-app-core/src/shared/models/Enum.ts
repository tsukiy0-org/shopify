import { Runtype, Unknown } from "runtypes";

export const Enum = <T>(enumObj: Record<string, T>): Runtype<T> => {
  return Unknown.withConstraint((_) => Object.values(enumObj).includes(_ as T));
};
