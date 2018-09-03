open Wonderjs;

open DrawModeType;

let _getFromArray = (array, index) =>
  WonderEditor.ArrayService.(unsafeGetNth(index, array));

let getDrawModeLineType = () => Lines |> drawModeToUint8;

let getDrawModePointType = () => Points |> drawModeToUint8;

let getDrawModeTriangleFanType = () => Triangle_fan |> drawModeToUint8;

let triggerChangeWrapEvent = (value, domChildren) => {
  let div = _getFromArray(domChildren, 0);
  let article = _getFromArray(div##children, 0);
  let select = _getFromArray(article##children, 1);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerChangeDrawModeEvent = type_ => {
  let inspectorComponent =
    BuildComponentTool.buildMeshRenderer(TestTool.buildEmptyAppState());

  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    triggerChangeWrapEvent(type_ |> string_of_int),
  );
};