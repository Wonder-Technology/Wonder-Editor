let triggerChangeXEvent = (value, domChildren) => {
  let div = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
  let input = WonderCommonlib.ArraySystem.unsafeGet(div##children, 1);
  BaseEventTool.triggerChangeEvent(input, BaseEventTool.buildFormEvent(value))
};

let triggerBlurXEvent = (value, domChildren) => {
  let xDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
  let xInput = WonderCommonlib.ArraySystem.unsafeGet(xDiv##children, 1);
  BaseEventTool.triggerBlurEvent(xInput, BaseEventTool.buildFormEvent(value))
};

let triggerChangeYEvent = (value, domChildren) => {
  let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
  let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
  BaseEventTool.triggerChangeEvent(yInput, BaseEventTool.buildFormEvent(value))
};

let triggerBlurYEvent = (value, domChildren) => {
  let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
  let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
  BaseEventTool.triggerBlurEvent(yInput, BaseEventTool.buildFormEvent(value))
};

let triggerChangeZEvent = (value, domChildren) => {
  let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
  let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
  BaseEventTool.triggerChangeEvent(zInput, BaseEventTool.buildFormEvent(value))
};

let triggerBlurZEvent = (value, domChildren) => {
  let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
  let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
  BaseEventTool.triggerBlurEvent(zInput, BaseEventTool.buildFormEvent(value))
};