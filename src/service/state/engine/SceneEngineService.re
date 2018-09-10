open Wonderjs;

let createDefaultSceneGameObjectsForEngineState =
    (cubeGeometry, engineState) => {
  let (engineState, box1) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box2) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, directionLight) =
    PrimitiveEngineService.createDirectionLightForEditEngineState(
      engineState,
    );
  let (engineState, camera) =
    CameraEngineService.createCameraForEngineState(engineState);

  (engineState, camera, box1, box2, directionLight);
};

let createDefaultSceneGameObjectsForRunEngineState =
    (cubeGeometry, editorState, engineState) => {
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, directionLight) =
    PrimitiveEngineService.createDirectionLightForRunEngineState(
      editorState,
      engineState,
    );
  let (editorState, engineState, camera) =
    CameraEngineService.createCameraForRunEngineState(
      editorState,
      engineState,
    );

  (editorState, engineState, camera, box1, box2, directionLight);
};

let getAmbientLightColor = SceneAPI.getAmbientLightColor;

let setAmbientLightColor = SceneAPI.setAmbientLightColor;

let getSceneGameObject = SceneAPI.getSceneGameObject;

let addSceneChild = SceneAPI.addSceneChild;

let addSceneChildren = SceneAPI.addSceneChildren;

let setSceneGameObject = SceneAPI.setSceneGameObject;

let disposeSceneAllChildrenKeepOrder = engineState => {
  let scene = engineState |> getSceneGameObject;

  engineState
  |> GameObjectEngineService.getAllGameObjects(scene)
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         engineState
         |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry(
              gameObject,
            ),
       engineState,
     );
};

let _getSceneActiveBasicCameraViews = (scene, engineState) =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(scene)
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.map(gameObject =>
       GameObjectComponentEngineService.getBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.filter(basicCameraView =>
       BasicCameraViewEngineService.isActiveBasicCameraView(
         basicCameraView,
         engineState,
       )
     )
  |> WonderLog.Contract.ensureCheck(
       activedBasicCameraViews =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|only has 0 or 1 active basicCameraView|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 activedBasicCameraViews |> Js.Array.length <= 1
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let getSceneActiveBasicCameraView = (scene, engineState) => {
  let activeBasicCameraViews =
    _getSceneActiveBasicCameraViews(scene, engineState);

  activeBasicCameraViews |> Js.Array.length === 0 ?
    None : Array.unsafe_get(activeBasicCameraViews, 0) |. Some;
};