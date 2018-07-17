let triggerShowColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 2);
  BaseEventTool.triggerClickEvent(button);
};

let triggerChangeColor = (material, color) =>
  MainEditorBasicMaterialColor.Method.changeColor(material, color);