let getEngineStateCustomData = (editorState, engineState) => Obj.magic(-1);

let getEngineStateIMGUIFunc = () =>
  Obj.magic((. _, apiJsObj, engineState) => {
    let editorState = StateEditorService.getState();

    let scene = engineState |> SceneEngineService.getSceneGameObject;
    let editCamera = SceneViewEditorService.unsafeGetEditCamera(editorState);

    let (_, _, viewWidth, viewHeight) =
      SceneViewEditorService.unsafeGetViewRect(editorState);

    let imageFunc = apiJsObj##image;
    let getTransformPosition = apiJsObj##getTransformPosition;
    let unsafeGetGameObjectTransformComponent = apiJsObj##unsafeGetGameObjectTransformComponent;
    let unsafeGetGameObjectPerspectiveCameraProjectionComponent = apiJsObj##unsafeGetGameObjectPerspectiveCameraProjectionComponent;
    let unsafeGetGameObjectBasicCameraViewComponent = apiJsObj##unsafeGetGameObjectBasicCameraViewComponent;

    let getAllGameObjects = apiJsObj##getAllGameObjects;

    let hasGameObjectBasicCameraViewComponent = apiJsObj##hasGameObjectBasicCameraViewComponent;
    let hasGameObjectDirectionLightComponent = apiJsObj##hasGameObjectDirectionLightComponent;
    let hasGameObjectPointLightComponent = apiJsObj##hasGameObjectPointLightComponent;

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

    let _getSceneCameras = (scene, engineState) =>
      getAllGameObjects(. scene, engineState)
      |> Js.Array.filter(gameObject =>
           hasGameObjectBasicCameraViewComponent(. gameObject, engineState)
         );

    let _getSceneDirectionLights = (scene, engineState) =>
      getAllGameObjects(. scene, engineState)
      |> Js.Array.filter(gameObject =>
           hasGameObjectDirectionLightComponent(. gameObject, engineState)
         );

    let _getScenePointLights = (scene, engineState) =>
      getAllGameObjects(. scene, engineState)
      |> Js.Array.filter(gameObject =>
           hasGameObjectPointLightComponent(. gameObject, engineState)
         );

    let _getEditCameraPosition = (editCamera, engineState) =>
      getTransformPosition(.
        unsafeGetGameObjectTransformComponent(. editCamera, engineState),
        engineState,
      );

    let _drawDirectionLight = (maxDistance, scene, engineState) =>
      WonderCommonlib.ArrayService.reduceOneParam(
        (. engineState, directionLightGameObject) => {
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
              (x, y, z, viewWidth, viewHeight),
              engineState,
            )
            |> _convertAnchorFromTopLeftToCenter((imageWidth, imageHeight));

          imageFunc(.
            (x, y, imageWidth, imageHeight),
            (0., 0., 1., 1.),
            "directionLight",
            engineState,
          );
        },
        engineState,
        _getSceneDirectionLights(scene, engineState),
      );

    let _drawPointLight = (maxDistance, scene, engineState) =>
      WonderCommonlib.ArrayService.reduceOneParam(
        (. engineState, pointLightGameObject) => {
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
              (x, y, z, viewWidth, viewHeight),
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
        _getScenePointLights(scene, engineState),
      );

    /* WonderLog.Log.debug(LogUtils.buildDebugMessage(~description={j|imgui -> scene: $scene|j}, ~params={j||j}), true); */

    let _drawSceneCamera = (maxDistance, scene, engineState) =>
      WonderCommonlib.ArrayService.reduceOneParam(
        (. engineState, sceneCameraGameObject) => {
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
              (x, y, z, viewWidth, viewHeight),
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
        _getSceneCameras(scene, engineState),
      );

    let engineState =
      _drawDirectionLight(maxDistance, scene, engineState)
      |> _drawPointLight(maxDistance, scene)
      |> _drawSceneCamera(maxDistance, scene);

    engineState;
  });