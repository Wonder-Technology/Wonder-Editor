let truncateFloatValue = (value: float, digit: int) => {
  let res = JsTypeHelper.toFixed(value, digit);

  JsTypeHelper.convertStringToFloat(res);
};