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
  MainEditorLightMaterial.Method.changeShininess(material, value);

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

let changeColor = (material, color) =>
  MainEditorLightMaterial.Method.changeColor(material, color);

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
    /* DragEventUtils.handleDragStart(
         textureNodeId,
         widget,
         dragImg,
         effectAllowd,
         event,
       ); */
    MainEditorLightMaterial.Method.onDrop(
      (uiState, dispatchFunc),
      material,
      textureNodeId,
      /* DragEventUtils.handleDragEnd(event); */
    );
};