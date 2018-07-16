open Wonderjs;

let create = BasicMaterialAPI.createBasicMaterial;

let getColor = BasicMaterialAPI.getBasicMaterialColor;

let setColor = (color, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialColor(material, color);

let getMap = OperateBasicMaterialMainService.getMap;

let unsafeGetMap = BasicMaterialAPI.unsafeGetBasicMaterialMap;

let setMap = (map, material, engineState) =>
  engineState |> BasicMaterialAPI.setBasicMaterialMap(material, map);

let convert16HexToRGBArr = (hexStr: string) => {
  let (r, g, b, _a) = ColorService.convert16HexToRGBA(hexStr);

  [|r, g, b|];
};