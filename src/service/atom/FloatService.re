let truncateFloatValue = (value: float, count: int) => {
  let res = JsTypeHelperType.toFixed(value, count);

  JsTypeHelperType.makeStringToFloat(res);
};