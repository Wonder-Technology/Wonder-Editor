let create = BasicMaterialLogicService.createBasicMaterial;

let getColor = (gameObjectMaterial, (editorState, engineState)) =>
  engineState |> BasicMaterialLogicService.getBasicMaterialColor(gameObjectMaterial);

let setColor = (gameObjectMaterial, color, (editorState, engineState)) => (
  editorState,
  engineState |> BasicMaterialLogicService.setBasicMaterialColor(gameObjectMaterial, color)
);