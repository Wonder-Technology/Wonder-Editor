let getCubeDomIndex = () => 1;

let getCubeGeometryName = () => "Cube";

let getSphereDomIndex = () => 2;

let getSphereGeometryName = () => "Sphere";

let getFirstNewGeometryDomIndex = () => 3;

let getBoxTextureGeometryName = () => "Mesh";

let triggerClickShowGeometryGroup = domChildren => {
  let geometryDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);

  let selectSpan =
    WonderCommonlib.ArrayService.unsafeGet(geometryDiv##children, 1);

  BaseEventTool.triggerClickEvent(selectSpan);
};

let triggerClickHideGeometryGroup = domChildren => {
  let selectComponentDiv =
    WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);

  let bg =
    WonderCommonlib.ArrayService.unsafeGet(selectComponentDiv##children, 1);

  BaseEventTool.triggerClickEvent(bg);
};

let triggerClickSpecificGeometry = (index, domChildren) => {
  let selectComponentDiv =
    WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
  let componentItem =
    WonderCommonlib.ArrayService.unsafeGet(selectComponentDiv##children, 0);
  let geometryDiv =
    WonderCommonlib.ArrayService.unsafeGet(componentItem##children, index);

  BaseEventTool.triggerClickEvent(geometryDiv);
};