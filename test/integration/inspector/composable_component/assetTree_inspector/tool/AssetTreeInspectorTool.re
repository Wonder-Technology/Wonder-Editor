let _getFromArray = (array, index) => ArrayService.getNth(index, array);
let triggerRenameChangeEvent = (value, domChildren) => {
  let article = _getFromArray(domChildren, 0);
  let div = _getFromArray(article##children, 0);
  let input = _getFromArray(div##children, 3);
  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};
let triggerRenameBlurEvent = (value, domChildren) => {
  let article = _getFromArray(domChildren, 0);
  let div = _getFromArray(article##children, 0);
  let input = _getFromArray(div##children, 3);
  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};