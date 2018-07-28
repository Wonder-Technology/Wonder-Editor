let _getFromArray = (array, index) => ArrayService.(getNth(index, array));
let _getIntensityInput = domChildren => {
  let div = _getFromArray(domChildren, 1);
  let article = _getFromArray(div##children, 0);
  let inputArticle = _getFromArray(article##children, 0);
  let input =
    WonderCommonlib.ArrayService.unsafeGet(inputArticle##children, 1);

  input;
};

let triggerIntensityChangeEvent = (value, domChildren) => {
  let input = _getIntensityInput(domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerIntensityBlurEvent = (value, domChildren) => {
  let input = _getIntensityInput(domChildren);

  BaseEventTool.triggerBlurEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};