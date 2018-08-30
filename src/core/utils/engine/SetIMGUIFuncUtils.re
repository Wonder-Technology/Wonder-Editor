/* TODO refactor: rename?move out? */
let getEditEngineStateCustomData = () =>
  (WonderCommonlib.ArrayService.reduceOneParam, DomHelper.getElementById)
  |> Obj.magic;

let getEditEngineStateIMGUIFunc = () =>
  Obj.magic((. (reduceOneParamFunc, getElementByIdFunc), apiJsObj, state) => {
    let editCanvas = getElementByIdFunc(. "editCanvas") |> Obj.magic;
    let (editCanvasWidth, editCanvasHeight) = (
      editCanvas##width,
      editCanvas##height,
    );

    let imageFunc = apiJsObj##image;
    let getTransformPosition = apiJsObj##getTransformPosition;
    let unsafeGetGameObjectTransformComponent = apiJsObj##unsafeGetGameObjectTransformComponent;
    let unsafeGetGameObjectPerspectiveCameraProjectionComponent = apiJsObj##unsafeGetGameObjectPerspectiveCameraProjectionComponent;
    let unsafeGetGameObjectBasicCameraViewComponent = apiJsObj##unsafeGetGameObjectBasicCameraViewComponent;

    let getAllDirectionLightComponents = apiJsObj##getAllDirectionLightComponents;
    let getAllPointLightComponents = apiJsObj##getAllPointLightComponents;
    let getAllBasicCameraViewComponents = apiJsObj##getAllBasicCameraViewComponents;

    let unsafeGetTransformGameObject = apiJsObj##unsafeGetTransformGameObject;
    let unsafeGetDirectionLightGameObject = apiJsObj##unsafeGetDirectionLightGameObject;
    let unsafeGetPointLightGameObject = apiJsObj##unsafeGetPointLightGameObject;
    let unsafeGetBasicCameraViewGameObject = apiJsObj##unsafeGetBasicCameraViewGameObject;

    let convertWorldToScreen = apiJsObj##convertWorldToScreen;
    let imageMaxWidth = 80.;
    let imageMaxHeight = 80.;
    let maxDistance = 500.;

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

    let _getDeepWidthAndHeight = (width, height, maxDistance, distance) => {
      let coefficient =
        distance >= maxDistance ?
          0. : (maxDistance -. distance) /. maxDistance;

      (width *. coefficient, height *. coefficient);
    };

    let _getEditEngineServiceCameraGameObjects = engineState =>
      getAllBasicCameraViewComponents(. engineState)
      |> Js.Array.map(basicCameraView =>
           unsafeGetBasicCameraViewGameObject(. basicCameraView, engineState)
         );

    let _getEditEngineServiceDirectionLightGameObjects = engineState =>
      getAllDirectionLightComponents(. engineState)
      |> Js.Array.map(directionLight =>
           unsafeGetDirectionLightGameObject(. directionLight, engineState)
         );

    let _getEditEngineServicePointLightGameObjects = engineState =>
      getAllPointLightComponents(. engineState)
      |> Js.Array.map(directionLight =>
           unsafeGetPointLightGameObject(. directionLight, engineState)
         );

    let _getEditCamera = engineState =>
      _getEditEngineServiceCameraGameObjects(engineState)
      |. Array.unsafe_get(0);

    let _getSceneCameras = engineState =>
      _getEditEngineServiceCameraGameObjects(engineState)
      |> Js.Array.sliceFrom(1);

    let _getEditCameraPosition = (editCamera, engineState) =>
      getTransformPosition(.
        unsafeGetGameObjectTransformComponent(. editCamera, engineState),
        engineState,
      );

    let _drawDirectionLight = (maxDistance, engineState) => {
      let editCamera = _getEditCamera(engineState);

      reduceOneParamFunc(.
        (engineState, directionLightGameObject) => {
          let (x, y, z) =
            getTransformPosition(.
              unsafeGetGameObjectTransformComponent(.
                directionLightGameObject,
                engineState,
              ),
              engineState,
            );

          let (imageWidth, imageHeight) =
            engineState
            |> _getEditCameraPosition(editCamera)
            |> _getDistanceWithTwoGameObject((x, y, z))
            |> _getDeepWidthAndHeight(
                 imageMaxWidth,
                 imageMaxHeight,
                 maxDistance,
               );

          let (x, y) =
            convertWorldToScreen(.
              unsafeGetGameObjectBasicCameraViewComponent(.
                editCamera,
                engineState,
              ),
              unsafeGetGameObjectPerspectiveCameraProjectionComponent(.
                editCamera,
                engineState,
              ),
              (x, y, z, editCanvasWidth, editCanvasHeight),
              engineState,
            )
            |> _convertAnchorFromTopLeftToCenter((
                 imageMaxWidth,
                 imageMaxHeight,
               ));

          imageFunc(.
            (x, y, imageWidth, imageHeight),
            (0., 0., 1., 1.),
            "directionLight",
            engineState,
          );
        },
        engineState,
        _getEditEngineServiceDirectionLightGameObjects(engineState),
      );
    };
    let _drawPointLight = (maxDistance, engineState) => {
      let editCamera = _getEditCamera(engineState);

      reduceOneParamFunc(.
        (engineState, pointLightGameObject) => {
          let (x, y, z) =
            getTransformPosition(.
              unsafeGetGameObjectTransformComponent(.
                pointLightGameObject,
                engineState,
              ),
              engineState,
            );

          let (imageWidth, imageHeight) =
            engineState
            |> _getEditCameraPosition(editCamera)
            |> _getDistanceWithTwoGameObject((x, y, z))
            |> _getDeepWidthAndHeight(
                 imageMaxWidth,
                 imageMaxHeight,
                 maxDistance,
               );

          let (x, y) =
            convertWorldToScreen(.
              unsafeGetGameObjectBasicCameraViewComponent(.
                editCamera,
                engineState,
              ),
              unsafeGetGameObjectPerspectiveCameraProjectionComponent(.
                editCamera,
                engineState,
              ),
              (x, y, z, editCanvasWidth, editCanvasHeight),
              engineState,
            )
            |> _convertAnchorFromTopLeftToCenter((imageWidth, imageHeight));

          imageFunc(.
            (x, y, imageWidth, imageHeight),
            (0., 0., 1., 1.),
            "pointLight",
            engineState,
          );
        },
        engineState,
        _getEditEngineServicePointLightGameObjects(engineState),
      );
    };
    let _drawSceneCamera = (maxDistance, engineState) => {
      let editCamera = _getEditCamera(engineState);

      reduceOneParamFunc(.
        (engineState, sceneCameraGameObject) => {
          let (x, y, z) =
            getTransformPosition(.
              unsafeGetGameObjectTransformComponent(.
                sceneCameraGameObject,
                engineState,
              ),
              engineState,
            );

          let (imageWidth, imageHeight) =
            engineState
            |> _getEditCameraPosition(editCamera)
            |> _getDistanceWithTwoGameObject((x, y, z))
            |> _getDeepWidthAndHeight(
                 imageMaxWidth,
                 imageMaxHeight,
                 maxDistance,
               );

          let (x, y) =
            convertWorldToScreen(.
              unsafeGetGameObjectBasicCameraViewComponent(.
                editCamera,
                engineState,
              ),
              unsafeGetGameObjectPerspectiveCameraProjectionComponent(.
                editCamera,
                engineState,
              ),
              (x, y, z, editCanvasWidth, editCanvasHeight),
              engineState,
            )
            |> _convertAnchorFromTopLeftToCenter((imageWidth, imageHeight));

          imageFunc(.
            (x, y, imageWidth, imageHeight),
            (0., 0., 1., 1.),
            "camera",
            engineState,
          );
        },
        engineState,
        _getSceneCameras(engineState),
      );
    };

    let state =
      _drawDirectionLight(maxDistance, state)
      |> _drawPointLight(maxDistance)
      |> _drawSceneCamera(maxDistance);

    state;
  });

let setIMGUIFunc = editEngineState =>
  ManageIMGUIEngineService.setIMGUIFunc(
    getEditEngineStateCustomData(),
    getEditEngineStateIMGUIFunc(),
    editEngineState,
  );