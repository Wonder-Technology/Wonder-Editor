let triggerChangeXEvent = (value, domChildren) => {
  let div = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let input = WonderCommonlib.ArrayService.unsafeGet(div##children, 1);
  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurXEvent = (value, domChildren) => {
  let xDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let xInput = WonderCommonlib.ArrayService.unsafeGet(xDiv##children, 1);
  BaseEventTool.triggerBlurEvent(
    xInput,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerChangeYEvent = (value, domChildren) => {
  let yDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
  let yInput = WonderCommonlib.ArrayService.unsafeGet(yDiv##children, 1);
  BaseEventTool.triggerChangeEvent(
    yInput,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurYEvent = (value, domChildren) => {
  let yDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
  let yInput = WonderCommonlib.ArrayService.unsafeGet(yDiv##children, 1);
  BaseEventTool.triggerBlurEvent(
    yInput,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerChangeZEvent = (value, domChildren) => {
  let zDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 2);
  let zInput = WonderCommonlib.ArrayService.unsafeGet(zDiv##children, 1);
  BaseEventTool.triggerChangeEvent(
    zInput,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerBlurZEvent = (value, domChildren) => {
  let zDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 2);
  let zInput = WonderCommonlib.ArrayService.unsafeGet(zDiv##children, 1);
  BaseEventTool.triggerBlurEvent(
    zInput,
    BaseEventTool.buildFormEvent(value),
  );
};

let simulateTwiceChangeEvent =
    (~firstValue="11.25", ~secondValue="15", currentGameObjectTransform) => {
  let component =
    BuildComponentTool.buildMainEditorTransformComponent(
      TestTool.buildEmptyAppState(),
      currentGameObjectTransform,
    );

  BaseEventTool.triggerComponentEvent(
    component,
    triggerChangeXEvent(firstValue),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerBlurXEvent(firstValue),
  );
  WonderLog.Log.print("engine value") |> ignore;

    TransformUtils.getSceneTreeNodeLocalPosition(currentGameObjectTransform)
    |> WonderLog.Log.print;

  BaseEventTool.triggerComponentEvent(
    component,
    triggerChangeYEvent(secondValue),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerBlurYEvent(secondValue),
  );

  WonderLog.Log.print("engine value") |> ignore;

    TransformUtils.getSceneTreeNodeLocalPosition(currentGameObjectTransform)
    |> WonderLog.Log.print;
};