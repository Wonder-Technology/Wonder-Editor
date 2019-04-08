let changeMaterialTypeToBeLightMaterial =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMaterial.Method.changeMaterialType(
    (uiState, dispatchFunc),
    (),
    (BasicMaterial, LightMaterial),
  );

let changeShininess =
    (~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(), ~value, ()) =>
  MainEditorLightMaterialForGameObject.Method.changeShininess(
    material,
    value,
  );

let blurShininess =
    (
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      ~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
      ~value,
      (),
    ) =>
  MainEditorLightMaterialForGameObject.Method.blurShininessEvent(
    (uiState, dispatchFunc),
    material,
    value,
  );

let getColor = material =>
  InspectorMaterialUtils.getLightMaterialColor(material, ());

let changeColor = (material, color) =>
  MainEditorLightMaterialForGameObject.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorLightMaterialForGameObject.Method.closeLightMaterialColorPick(
    (uiState, dispatchFunc),
    material,
    color,
  );

module Drag = {
  let dragAssetTextureToMap =
      (
        ~dispatchFunc=_ => (),
        ~uiState=TestTool.buildEmptyAppState(),
        ~widget=AssetWidgetService.getWidget(),
        ~effectAllowd="move",
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        ~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
        ~textureNodeId,
        (),
      ) =>
    InspectorMaterialUtils.dragToSetLightMaterialTexture(
      (uiState, dispatchFunc),
      material,
      textureNodeId,
      /* DragEventUtils.handleDragEnd(event); */
    );
};