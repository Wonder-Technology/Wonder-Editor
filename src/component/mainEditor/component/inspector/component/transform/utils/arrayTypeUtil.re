let interceptFloatValue = (value: float, count: int) => {
  let res = DomHelper.toFixed(value, count);
  DomHelper.makeNumber(res)
};

let interceptTransformValue = (transformTuple) => {
  let (x, y, z) = transformTuple;
  let interceptLen = 6;
  (
    interceptFloatValue(x, interceptLen),
    interceptFloatValue(y, interceptLen),
    interceptFloatValue(z, interceptLen)
  )
};