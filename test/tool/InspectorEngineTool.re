let getSceneCameras = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(
       engineState |> SceneEngineService.getSceneGameObject,
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     );

let unsafeGetSceneFirstCamera = engineState =>
  getSceneCameras(engineState) |> ArrayService.unsafeGetFirst;

let getSceneDirectionLights = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getChildren(
       engineState |> SceneEngineService.getSceneGameObject,
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasDirectionLightComponent(
         gameObject,
         engineState,
       )
     );

let getSceneAllChild = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getChildren(
       engineState |> SceneEngineService.getSceneGameObject,
     );

let getSceneEmptyGameObject = engineState =>
  engineState |> getSceneAllChild |> ArrayService.unsafeGetLast;

let getMaterialSphere = InspectorEngineGameObjectLogicService.getMaterialSphere;

let getWDBGameObject = InspectorEngineGameObjectLogicService.getWDBGameObject;

let disposeInspectorEngineParentGameObjectAllChild = InspectorEngineGameObjectLogicService.disposeInspectorEngineParentGameObjectAllChild;

let getMaterialSphereLightMaterial = (editorState, engineState) => {
  let materialSphere =
    (editorState, engineState)
    |> InspectorEngineGameObjectLogicService.getMaterialSphere
    |> OptionService.unsafeGet;

  engineState
  |> GameObjectComponentEngineService.getLightMaterialComponent(
       materialSphere,
     )
  |> OptionService.unsafeGet;
};

let getMaterialSphereBasicMaterial = (editorState, engineState) => {
  let materialSphere =
    (editorState, engineState)
    |> InspectorEngineGameObjectLogicService.getMaterialSphere
    |> OptionService.unsafeGet;

  engineState
  |> GameObjectComponentEngineService.getBasicMaterialComponent(
       materialSphere,
     )
  |> OptionService.unsafeGet;
};