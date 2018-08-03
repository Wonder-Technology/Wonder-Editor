let triggerShowColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 2);
  BaseEventTool.triggerClickEvent(button);
};

let triggerCloseColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let colorPickContent =
    WonderCommonlib.ArrayService.unsafeGet(div##children, 3);
  let closeDiv =
    WonderCommonlib.ArrayService.unsafeGet(colorPickContent##children, 1);

  BaseEventTool.triggerClickEvent(closeDiv);
};

let triggerChangeBasicColor = (material, color) =>
  MainEditorBasicMaterial.Method.changeColor(material, color);

let triggerChangeLightColor = (material, color) =>
  MainEditorLightMaterial.Method.changeColor(material, color);

let triggerChangeDirectionLightColor = (material, color) =>
  MainEditorDirectionLight.Method.changeColor(material, color);

let triggerChangePointLightColor = (material, color) =>
  MainEditorPointLight.Method.changeColor(material, color);