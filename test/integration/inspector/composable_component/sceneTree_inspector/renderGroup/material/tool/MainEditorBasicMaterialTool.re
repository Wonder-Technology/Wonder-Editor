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
  InspectorMaterialUtils.getBasicMaterialColor(material, ());

let changeColor = (material, color) =>
  MainEditorBasicMaterialForGameObject.Method.changeColor(material, color);

let changeColorWithInspectorEngineState = (material, color) =>
  MainEditorBasicMaterialForAsset.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  InspectorMaterialUtils.closeBasicMaterialColorPick(
    (uiState, dispatchFunc),
    material,
    color,
  );