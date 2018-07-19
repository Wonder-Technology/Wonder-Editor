let truncateFloatValue = (value: float, count: int) => {
  let res = JsTypeHelper.toFixed(value, count);

  JsTypeHelper.makeStringToFloat(res);
};