open MainEditorMaterialType;

open AssetMaterialDataType;

let changeMaterialTypeToBeBasicMaterial =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMaterial.Method.changeMaterialType(
    (store, dispatchFunc),
    (),
    (LightMaterial, BasicMaterial),
  );

let getColor = material =>
  MainEditorBasicMaterial.Method.getColor(material, ());

let changeColor = (material, color) =>
  MainEditorBasicMaterial.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~color,
      ~dispatchFunc=_ => (),
      ~store=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorBasicMaterial.Method.closeColorPick(
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
    MainEditorBasicMaterial.Method.onDrop(
      (store, dispatchFunc),
      material,
      textureNodeId,
    );
    DragEventUtils.handleDrageEnd(event);
  };
};