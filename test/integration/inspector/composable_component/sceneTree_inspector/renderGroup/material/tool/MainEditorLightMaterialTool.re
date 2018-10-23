let changeMaterialTypeToBeLightMaterial =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMaterial.Method.changeMaterialType(
    (store, dispatchFunc),
    (),
    (BasicMaterial, LightMaterial),
  );

let changeShininess =
    (~material=GameObjectTool.getCurrentGameObjectMaterial(), ~value, ()) =>
  MainEditorLightMaterial.Method.changeShininess(material, value);

let blurShininess =
    (
      ~dispatchFunc=_ => (),
      ~store=TestTool.buildEmptyAppState(),
      ~material=GameObjectTool.getCurrentGameObjectMaterial(),
      ~value,
      (),
    ) =>
  MainEditorLightMaterial.Method.blurShininessEvent(
    (store, dispatchFunc),
    material,
    value,
  );

let getColor = material =>
  MainEditorLightMaterial.Method.getColor(material, ());

let changeColor = (material, color) =>
  MainEditorLightMaterial.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~color,
      ~dispatchFunc=_ => (),
      ~store=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorLightMaterial.Method.closeColorPick(
    (store, dispatchFunc),
    material,
    color,
  );

module Drag = {
  let dragAssetTextureToMap =
      (
        ~dispatchFunc=_ => (),
        ~store=TestTool.buildEmptyAppState(),
        ~widget=AssetUtils.getWidget(),
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        ~material=GameObjectTool.getCurrentGameObjectMaterial(),
        ~textureNodeId,
        (),
      ) => {
    DragEventUtils.handleDragStart(textureNodeId, widget, dragImg, event);
    MainEditorLightMaterial.Method.onDrop(
      (store, dispatchFunc),
      material,
      textureNodeId,
    );
    DragEventUtils.handleDrageEnd(event);
  };
};