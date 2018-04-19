let triggerOnChangeEvent = (value, domChildren) => {
  let stringInput = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let input = WonderCommonlib.ArrayService.unsafeGet(stringInput##children, 1);
  BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
};

let triggerOnBlurEvent = (value, domChildren) => {
  let stringInput = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let input = WonderCommonlib.ArrayService.unsafeGet(stringInput##children, 1);
  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value))
};

let triggerChangeAndBlurMaterialEvent = (component, value) => {
  BaseEventTool.triggerComponentEvent(component, triggerOnChangeEvent(value));
  BaseEventTool.triggerComponentEvent(component, triggerOnBlurEvent(value))
};