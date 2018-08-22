let triggerClickShowGeometryGroup = domChildren => {
  let geometryDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);

  let selectSpan =
    WonderCommonlib.ArrayService.unsafeGet(geometryDiv##children, 1);

  BaseEventTool.triggerClickEvent(selectSpan);
};

let triggerClickHideGeometryGroup = domChildren => {
  let selectComponentDiv = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);

  let bg =
    WonderCommonlib.ArrayService.unsafeGet(selectComponentDiv##children, 1);

  BaseEventTool.triggerClickEvent(bg);
};