open MainEditorMaterialType;

open MaterialDataAssetType;

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