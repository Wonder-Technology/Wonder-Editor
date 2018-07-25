let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickAddComponentEvent = domChildren => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 3);
  let button = WonderCommonlib.ArrayService.unsafeGet(article##children, 0);
  BaseEventTool.triggerClickEvent(button);
};

let triggerClickAddLightEvent = domChildren => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 3);
  let lightDiv = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);

  BaseEventTool.triggerClickEvent(lightDiv);
};
let triggerClickAddSourceInstanceEvent = domChildren => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 3);
  let sourceInstanceDiv =
    WonderCommonlib.ArrayService.unsafeGet(article##children, 2);
  BaseEventTool.triggerClickEvent(sourceInstanceDiv);
};

let triggerShowColorPickEvent = domChildren => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 4);
  let div =
    WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 2);
  BaseEventTool.triggerClickEvent(button);
};