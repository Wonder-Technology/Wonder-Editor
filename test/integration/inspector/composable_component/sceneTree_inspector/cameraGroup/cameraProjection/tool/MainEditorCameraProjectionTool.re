let _getFromArray = (array, index) => ArrayService.(unsafeGetNth(index, array));

let getNearDomIndex = () => 1;

let getFarDomIndex = () => 2;

let getAspectDomIndex = () => 3;

let getFovyDomIndex = () => 4;

let _getComponentInputByIndex = (index, domChildren) => {
  let div = _getFromArray(domChildren, index);
  let article = _getFromArray(div##children, 0);
  let input = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);

  input;
};

let triggerPerspectiveComponentChangeEvent = (index, value, domChildren) => {
  let input = _getComponentInputByIndex(index, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerPerspectiveComponentBlurEvent = (index, value, domChildren) => {
  let input = _getComponentInputByIndex(index, domChildren);

  BaseEventTool.triggerBlurEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerPerspectiveCameraChangeAndBlurEvent = (domIndex, value) => {
  let component = BuildComponentTool.buildCameraProjection();
  BaseEventTool.triggerComponentEvent(
    component,
    triggerPerspectiveComponentChangeEvent(domIndex, value),
  );
  BaseEventTool.triggerComponentEvent(
    component,
    triggerPerspectiveComponentBlurEvent(domIndex, value),
  );
};