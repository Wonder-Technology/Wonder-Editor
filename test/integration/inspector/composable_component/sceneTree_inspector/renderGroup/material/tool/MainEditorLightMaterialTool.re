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
    (
      ~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
      ~value,
      ~isShowInspectorCanvas=false,
      (),
    ) =>
  MainEditorLightMaterial.Method.changeShininess(
    isShowInspectorCanvas,
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
  MainEditorLightMaterial.Method.blurShininessEvent(
    (uiState, dispatchFunc),
    material,
    value,
  );

let getColor = material =>
  MainEditorLightMaterial.Method.getColor(material, ());

let changeColor = (isShowInspectorCanvas, material, color) =>
  MainEditorLightMaterial.Method.changeColor(
    isShowInspectorCanvas,
    material,
    color,
  );

let closeColorPicker =
    (
      ~material,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorLightMaterial.Method.closeColorPick(
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
    MainEditorLightMaterial.Method.dragToSetMaterialTexture(
      (uiState, dispatchFunc),
      material,
      textureNodeId,
      /* DragEventUtils.handleDragEnd(event); */
    );
};