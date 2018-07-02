let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickAddComponentEvent = (domChildren) => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article = WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 3);
  let button = WonderCommonlib.ArrayService.unsafeGet(article##children, 0);
  BaseEventTool.triggerClickEvent(button)
};

let triggerClickAddSourceInstanceEvent = (domChildren) => {
  let articleParent = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let article = WonderCommonlib.ArrayService.unsafeGet(articleParent##children, 3);
  let sourceInstanceDiv = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);
  BaseEventTool.triggerClickEvent(sourceInstanceDiv)
};