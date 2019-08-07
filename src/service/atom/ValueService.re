open ValueType;

let isValueEqual = (type g, kind: value(g), sourceValue, targetValue) =>
  switch (kind) {
  | Float => sourceValue == targetValue
  | String => sourceValue == targetValue
  };

let isValueValid = [%raw
  value => {|
   return value !== undefined && value !== null;
  |}
];

let isEqual = (source, target) => source === target;