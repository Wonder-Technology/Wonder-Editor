let getEngineStateCustomData = (editorState, engineState) => Obj.magic(-1);

let _convertAnchorFromTopLeftToCenter = ((width, height), (x, y)) => (
  x -. width /. 2.,
  y -. height /. 2.,
);

let _getDistanceWithTwoGameObject = ((x1, y1, z1), (x2, y2, z2)) =>
  Js.Math.sqrt(
    (x1 -. x2)
    *. (x1 -. x2)
    +. (y1 -. y2)
    *. (y1 -. y2)
    +. (z1 -. z2)
    *. (z1 -. z2),
  );

let _computeSize = (width, height, maxDistance, distance) => {
  let factor =
    distance >= maxDistance ? 0. : (maxDistance -. distance) /. maxDistance;

  (width *. factor, height *. factor);
};

let _getSceneCameras = (scene, allGameObjects, engineState) =>
  allGameObjects
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     );

let _getSceneDirectionLights = (scene, allGameObjects, engineState) =>
  allGameObjects
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasDirectionLightComponent(
         gameObject,
         engineState,
       )
     );

let _getScenePointLights = (scene, allGameObjects, engineState) =>
  allGameObjects
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasPointLightComponent(
         gameObject,
         engineState,
       )
     );

let getIMGUIGameObjects = (scene, engineState) => {
  let allGameObjects =
    HierarchyGameObjectEngineService.getAllGameObjects(scene, engineState);

  ArrayService.fastConcatArrays([|
    _getSceneCameras(scene, allGameObjects, engineState),
    _getSceneDirectionLights(scene, allGameObjects, engineState),
    _getScenePointLights(scene, allGameObjects, engineState),
  |]);
};

let _getEditCameraPosition = (editCamera, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      editCamera,
      engineState,
    ),
    engineState,
  );

let _convertPosition =
    (
      (x, y, z, viewWidth, viewHeight),
      (imageWidth, imageHeight),
      editCamera,
      engineState,
    ) =>
  CoordinateEngineService.convertWorldToScreen(
    GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
      editCamera,
      engineState,
    ),
    GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
      editCamera,
      engineState,
    ),
    (
      x,
      y,
      z,
      viewWidth |> NumberType.convertIntToFloat,
      viewHeight |> NumberType.convertIntToFloat,
    ),
    engineState,
  )
  |> _convertAnchorFromTopLeftToCenter((imageWidth, imageHeight));

let _getImageMaxWidth = () => 30.;

let _getImageMaxHeight = () => 30.;

let _getMaxDistance = () => 500.;

let computePositionAndSize = (gameObject, editorState, engineState) => {
  let editCamera = SceneViewEditorService.unsafeGetEditCamera(editorState);
  let imageMaxWidth = _getImageMaxWidth();
  let imageMaxHeight = _getImageMaxHeight();
  let maxDistance = _getMaxDistance();
  let (_, _, viewWidth, viewHeight) =
    SceneViewEditorService.unsafeGetViewRect(editorState);

  let (x, y, z) =
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        gameObject,
        engineState,
      ),
      engineState,
    );

  let (imageWidth, imageHeight) =
    engineState
    |> _getEditCameraPosition(editCamera)
    |> _getDistanceWithTwoGameObject((x, y, z))
    |> _computeSize(imageMaxWidth, imageMaxHeight, maxDistance);

  let (x, y) =
    _convertPosition(
      (x, y, z, viewWidth, viewHeight),
      (imageWidth, imageHeight),
      editCamera,
      engineState,
    );

  (x, y, imageWidth, imageHeight);
};

let _drawLight =
    (
      (maxDistance, scene, allGameObjects),
      name,
      sceneLights,
      imageFunc,
      editorState,
      engineState,
    ) =>
  WonderCommonlib.ArrayService.reduceOneParam(
    (. engineState, directionLightGameObject) => {
      let (x, y, imageWidth, imageHeight) =
        computePositionAndSize(
          directionLightGameObject,
          editorState,
          engineState,
        );

      imageFunc(.
        (x, y, imageWidth, imageHeight),
        (0., 0., 1., 1.),
        name,
        engineState,
      );
    },
    engineState,
    sceneLights,
  );

let _drawDirectionLight =
    (maxDistance, scene, allGameObjects, imageFunc, editorState, engineState) =>
  _drawLight(
    (maxDistance, scene, allGameObjects),
    "directionLight",
    _getSceneDirectionLights(scene, allGameObjects, engineState),
    imageFunc,
    editorState,
    engineState,
  );

let _drawPointLight =
    (maxDistance, scene, allGameObjects, imageFunc, editorState, engineState) =>
  _drawLight(
    (maxDistance, scene, allGameObjects),
    "pointLight",
    _getScenePointLights(scene, allGameObjects, engineState),
    imageFunc,
    editorState,
    engineState,
  );

let _drawSceneCamera =
    (maxDistance, scene, allGameObjects, imageFunc, editorState, engineState) =>
  WonderCommonlib.ArrayService.reduceOneParam(
    (. engineState, sceneCameraGameObject) => {
      let (x, y, imageWidth, imageHeight) =
        computePositionAndSize(
          sceneCameraGameObject,
          editorState,
          engineState,
        );

      imageFunc(.
        (x, y, imageWidth, imageHeight),
        (0., 0., 1., 1.),
        "camera",
        engineState,
      );
    },
    engineState,
    _getSceneCameras(scene, allGameObjects, engineState),
  );

let getEngineStateIMGUIFunc = () =>
  Obj.magic((. _, apiJsObj, engineState) => {
    let editorState = StateEditorService.getState();
    let scene = engineState |> SceneEngineService.getSceneGameObject;
    let imageFunc = apiJsObj##image;
    let maxDistance = _getMaxDistance();

    let allGameObjects =
      HierarchyGameObjectEngineService.getAllGameObjects(scene, engineState);

    let engineState =
      _drawDirectionLight(
        maxDistance,
        scene,
        allGameObjects,
        imageFunc,
        editorState,
        engineState,
      )
      |> _drawPointLight(
           maxDistance,
           scene,
           allGameObjects,
           imageFunc,
           editorState,
         )
      |> _drawSceneCamera(
           maxDistance,
           scene,
           allGameObjects,
           imageFunc,
           editorState,
         );

    engineState;
  });