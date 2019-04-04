open MainEditorMaterialType;

open MaterialDataAssetType;

let changeMaterialTypeToBeBasicMaterial =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMaterial.Method.changeMaterialType(
    (uiState, dispatchFunc),
    (),
    (LightMaterial, BasicMaterial),
  );

let getColor = material =>
  MainEditorBasicMaterial.Method.getColor(material, ());

let changeColor = (isShowInspectorCanvas, material, color) =>
  MainEditorBasicMaterial.Method.changeColor(
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
  MainEditorBasicMaterial.Method.closeColorPick(
    (uiState, dispatchFunc),
    material,
    color,
  );