let createBasicMaterial = BasicMaterialLogicService.createBasicMaterial;

let getBasicMaterialColor = (gameObjectMaterial, (editorState, engineState)) =>
  engineState |> BasicMaterialLogicService.getBasicMaterialColor(gameObjectMaterial);

let setBasicMaterialColor = (gameObjectMaterial, color, (editorState, engineState)) => (
  editorState,
  engineState |> BasicMaterialLogicService.setBasicMaterialColor(gameObjectMaterial, color)
);