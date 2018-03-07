let create = BasicMaterialLogicSingleService.create;

let getColor = (gameObjectMaterial, (editorState, engineState)) =>
  engineState |> BasicMaterialLogicSingleService.getColor(gameObjectMaterial);

let setColor = (gameObjectMaterial, color, (editorState, engineState)) => (
  editorState,
  engineState |> BasicMaterialLogicSingleService.setColor(gameObjectMaterial, color)
);