let triggerShowColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 2);
  BaseEventTool.triggerClickEvent(button);
};

let triggerCloseColorPickEvent = triggerShowColorPickEvent;

let triggerChangeBasicColor = (material, color) =>
  MainEditorBasicMaterial.Method.changeColor(material, color);

let triggerChangeLightColor = (material, color) =>
  MainEditorLightMaterial.Method.changeColor(material, color);

let triggerChangeDirectionLightColor = (material, color) =>
  MainEditorDirectionLight.Method.changeColor(material, color);