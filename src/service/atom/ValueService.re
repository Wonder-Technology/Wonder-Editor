open ValueType;

let isValueEqual = (type g, kind: value(g), sourceValue, targetValue) =>
  switch (kind) {
  | Float => sourceValue == targetValue
  | String => sourceValue == targetValue
  };