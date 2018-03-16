let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickAddComponentEvent = (domChildren) => {
  let article = WonderCommonlib.ArrayService.unsafeGet(domChildren, 2);
  let button = WonderCommonlib.ArrayService.unsafeGet(article##children, 0);
  BaseEventTool.triggerClickEvent(button)
};

let triggerClickAddSourceInstanceEvent = (domChildren) => {
  let article = WonderCommonlib.ArrayService.unsafeGet(domChildren, 2);
  let sourceInstanceDiv = WonderCommonlib.ArrayService.unsafeGet(article##children, 1);
  BaseEventTool.triggerClickEvent(sourceInstanceDiv)
};