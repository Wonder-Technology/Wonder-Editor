let changeShininess =
    (~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(), ~value, ()) =>
  MainEditorLightMaterialForAsset.Method.changeShininess(material, value);

let changeColor = (material, color) =>
  MainEditorLightMaterialForAsset.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~currentNodeId,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorLightMaterialForAsset.Method.closeLightMaterialColorPick(
    (uiState, dispatchFunc),
    (material, currentNodeId),
    color,
  );