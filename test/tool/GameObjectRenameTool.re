let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let _getTriggerRenameInput = domChildren => {
  let article = _getFromArray(domChildren, 0);
  let div = _getFromArray(article##children, 0);
  let inputArticle = _getFromArray(div##children, 0);
  let input = _getFromArray(inputArticle##children, 1);

  input;
};
let triggerRenameChangeEvent = (value, domChildren) => {
  let input = _getTriggerRenameInput(domChildren);
  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};
let triggerRenameBlurEvent = (value, domChildren) => {
  let input = _getTriggerRenameInput(domChildren);
  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};