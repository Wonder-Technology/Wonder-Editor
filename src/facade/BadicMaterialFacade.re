let create = BasicMaterialLogicService.create;

let getColor = (gameObjectMaterial, (editorState, engineState)) =>
  engineState |> BasicMaterialLogicService.getColor(gameObjectMaterial);

let setColor = (gameObjectMaterial, color, (editorState, engineState)) => (
  editorState,
  engineState |> BasicMaterialLogicService.setColor(gameObjectMaterial, color)
);