let _getFromArray = (array, index) => ArrayService.getNth(index, array);

let triggerClickAddComponentEvent = (domChildren) => {
  let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
  let button = WonderCommonlib.ArraySystem.unsafeGet(article##children, 0);
  EventToolUI.triggerClickEvent(button)
};

let triggerClickAddSourceInstanceEvent = (domChildren) => {
  let article = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
  let sourceInstanceDiv = WonderCommonlib.ArraySystem.unsafeGet(article##children, 1);
  EventToolUI.triggerClickEvent(sourceInstanceDiv)
};