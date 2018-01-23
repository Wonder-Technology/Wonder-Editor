let triggerChangeXEvent = (value, domChildren) => {
  let div = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
  let input = WonderCommonlib.ArraySystem.unsafeGet(div##children, 1);
  EventToolUI.triggerChangeEvent(input, EventToolUI.buildFormEvent(value))
};

let triggerBlurXEvent = (value, domChildren) => {
  let xDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
  let xInput = WonderCommonlib.ArraySystem.unsafeGet(xDiv##children, 1);
  EventToolUI.triggerBlurEvent(xInput, EventToolUI.buildFormEvent(value))
};

let triggerChangeYEvent = (value, domChildren) => {
  let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
  let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
  EventToolUI.triggerChangeEvent(yInput, EventToolUI.buildFormEvent(value))
};

let triggerBlurYEvent = (value, domChildren) => {
  let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
  let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
  EventToolUI.triggerBlurEvent(yInput, EventToolUI.buildFormEvent(value))
};

let triggerChangeZEvent = (value, domChildren) => {
  let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
  let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
  EventToolUI.triggerChangeEvent(zInput, EventToolUI.buildFormEvent(value))
};

let triggerBlurZEvent = (value, domChildren) => {
  let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
  let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
  EventToolUI.triggerBlurEvent(zInput, EventToolUI.buildFormEvent(value))
};