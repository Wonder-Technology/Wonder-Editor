let createDefaultSceneGameObjects = (componentData, editorState, engineState) => {
  let (editorState, engineState, cube1) =
    PrimitiveLogicService.createCube(
      componentData,
      editorState,
      engineState,
    );
  let (editorState, engineState, cube2) =
    PrimitiveLogicService.createCube(
      componentData,
      editorState,
      engineState,
    );
  let (editorState, engineState, directionLight) =
    PrimitiveLogicService.createDirectionLight(editorState, engineState);
  let (editorState, engineState, camera) =
    CameraLogicService.createCamera(editorState, engineState);

  (editorState, engineState, camera, cube1, cube2, directionLight);
};
