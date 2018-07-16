external convertColorPickToJsObj : Color.colorPickType => Js.t({..}) =
  "%identity";

let triggerShowColorPickEvent = domChildren => {
  let colorArticle = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
  let div = WonderCommonlib.ArrayService.unsafeGet(colorArticle##children, 0);
  let button = WonderCommonlib.ArrayService.unsafeGet(div##children, 1);
  BaseEventTool.triggerClickEvent(button);
};

let triggerChangeColor = (material, color) =>
  MainEditorBasicMaterialColor.Method.changeColor(
    (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
    material,
    color,
  );
