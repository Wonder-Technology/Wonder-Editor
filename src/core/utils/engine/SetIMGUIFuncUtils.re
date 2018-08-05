let setIMGUIFunc = (scene, editEngineState) =>
  ManageIMGUIEngineService.setIMGUIFunc(
    (
      WonderCommonlib.ArrayService.reduceOneParam
      |> SerializeService.serializeFunction,
      DomHelper.getElementById("editCanvas")
      |> DomHelperType.convertDomElementToJsObj,
    )
    |> Obj.magic,
    Obj.magic((. (reduceOneParamFuncStr, editCanvas), apiJsObj, state) => {
      let _deserializeFunction = [%raw
        funcStr => {|
            return eval('(' + funcStr + ')');
            |}
      ];

      let reduceOneParamFunc = _deserializeFunction(reduceOneParamFuncStr);
      let imageFunc = apiJsObj##image;
      let unsafeGetTransformChildren = apiJsObj##unsafeGetTransformChildren;
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
      let imageWidth = 80.;
      let imageHeight = 80.;

      let _getIMGUIAnchor = ((width, height), (x, y)) => (
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
          (maxDistance -. distance)
          /. maxDistance
          |> (value => value <= 0. ? 0. : value);

        (width *. coefficient, height *. coefficient);
      };

      let _getEditEngineServiceCameraGameObjects = engineState =>
        getAllBasicCameraViewComponents(. engineState)
        |> Js.Array.map(basicCameraView =>
             unsafeGetBasicCameraViewGameObject(.
               basicCameraView,
               engineState,
             )
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

      let _drawDirectionLight = engineState => {
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
              |> _getDeepWidthAndHeight(imageWidth, imageHeight, 300.);

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
                (x, y, z, editCanvas##width, editCanvas##height),
                engineState,
              )
              |> _getIMGUIAnchor((imageWidth, imageHeight));

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
      let _drawPointLight = engineState => {
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
              |> _getDeepWidthAndHeight(imageWidth, imageHeight, 300.);

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
                (x, y, z, editCanvas##width, editCanvas##height),
                engineState,
              )
              |> _getIMGUIAnchor((imageWidth, imageHeight));

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
      let _drawSceneCamera = engineState => {
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
              |> _getDeepWidthAndHeight(imageWidth, imageHeight, 300.);

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
                (x, y, z, editCanvas##width, editCanvas##height),
                engineState,
              )
              |> _getIMGUIAnchor((imageWidth, imageHeight));

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
        _drawDirectionLight(state) |> _drawPointLight |> _drawSceneCamera;

      state;
    }),
    editEngineState,
  );