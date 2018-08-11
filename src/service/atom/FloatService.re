let truncateFloatValue = (value: float, count: int) => {
  let res = JsTypeHelper.toFixed(value, count);

  JsTypeHelper.convertStringToFloat(res);
};