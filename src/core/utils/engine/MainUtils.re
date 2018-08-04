open Js.Promise;

let _getLoadData = type_ => {
  let engineDataDir = "./src/engine/data/";
  switch (type_) {
  | "edit" =>
    AssetEngineService.loadToData(
      [|"./src/engine/setting/editSetting.json", engineDataDir|],
      EngineStateDataEditorService.getEditEngineStateData(),
    )
  | "run" =>
    AssetEngineService.loadToData(
      [|"./src/engine/setting/runSetting.json", engineDataDir|],
      EngineStateDataEditorService.getRunEngineStateData(),
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getLoadData",
        ~description={j|the type_ is not find|j},
        ~reason="",
        ~solution={j|check the param|j},
        ~params={j|type:$type_|j},
      ),
    )
  };
};

let _buildSetStateFunc = setEngineStateFunc =>
  (. state) => {
    let state =
      SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
        state : state |> DirectorEngineService.loopBody(0.);

    state |> setEngineStateFunc;

    state;
  };

let _setUnsafeGetStateFuncAndSetStateFuncForEvent =
    (getEngineStateFunc, setEngineStateFunc, engineState) =>
  engineState
  |> StateEngineService.setUnsafeGetStateFunc((.) => getEngineStateFunc())
  |> StateEngineService.setSetStateFunc(
       _buildSetStateFunc(setEngineStateFunc),
     );

let _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent =
    editEngineState =>
  _setUnsafeGetStateFuncAndSetStateFuncForEvent(
    StateLogicService.getEditEngineState,
    StateLogicService.setEditEngineState,
    editEngineState,
  );

let _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent =
    runEngineState =>
  _setUnsafeGetStateFuncAndSetStateFuncForEvent(
    StateLogicService.getRunEngineState,
    StateLogicService.setRunEngineState,
    runEngineState,
  );

let _setIMGUIFunc = (scene, editEngineState) =>
  ManageIMGUIEngineService.setIMGUIFunc(
    (
      scene,
      WonderCommonlib.ArrayService.reduceOneParam
      |> SerializeService.serializeFunction,
    )
    |> Obj.magic,
    Obj.magic((. (scene, reduceOneParamFuncStr), apiJsObj, state) => {
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
      let unsafeGetTransformGameObject = apiJsObj##unsafeGetTransformGameObject;
      let unsafeGetDirectionLightGameObject = apiJsObj##unsafeGetDirectionLightGameObject;
      let convertWorldToScreen = apiJsObj##convertWorldToScreen;

      let _getChildren = (gameObject, engineState) =>
        unsafeGetTransformChildren(.
          unsafeGetGameObjectTransformComponent(. gameObject, engineState),
          engineState,
        )
        |> Js.Array.map(transform =>
             unsafeGetTransformGameObject(. transform, engineState)
           );

      let _unsafeGetEditEngineServiceCameraGameObject = sceneChildren =>
        Array.unsafe_get(sceneChildren, 1);

      let _getEditEngineServiceDirectionLightGameObjects = engineState =>
        getAllDirectionLightComponents(. engineState)
        |> Js.Array.map(directionLight =>
             unsafeGetDirectionLightGameObject(. directionLight, engineState)
           );

      let _drawDirectionLight = (scene, engineState) => {
        let sceneChildren = _getChildren(scene, engineState);

        let camera =
          _unsafeGetEditEngineServiceCameraGameObject(sceneChildren);

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

            let (x, y) =
              convertWorldToScreen(.
                unsafeGetGameObjectBasicCameraViewComponent(.
                  camera,
                  engineState,
                ),
                unsafeGetGameObjectPerspectiveCameraProjectionComponent(.
                  camera,
                  engineState,
                ),
                /* TODO use canvas width/height */
                (x, y, z, 553.0, 427.0),
                engineState,
              );

            let imageX1 = 0;
            let imageY1 = 0;
            let imageWidth1 = 80;
            let imageHeight1 = 80;

            imageFunc(.
              (x, y, imageWidth1, imageHeight1),
              (0., 0., 1., 1.),
              "directionLight",
              engineState,
            );
          },
          engineState,
          _getEditEngineServiceDirectionLightGameObjects(engineState),
        );
      };

      let state = _drawDirectionLight(scene, state);

      state;
    }),
    editEngineState,
  );

let init = editorState =>
  Wonderjs.StateDataMainType.(
    _getLoadData("edit")
    |> WonderBsMost.Most.flatMap(editEngineState =>
         LoaderManagerEngineService.loadIMGUIAsset(
           "./public/font/myFont.fnt",
           "./public/font/myFont.png",
           Js.Nullable.return([|
             ("./public/img/camera.png", "camera"),
             ("./public/img/sun.png", "directionLight"),
             ("./public/img/point.jpg", "pointLight"),
           |]),
           editEngineState,
         )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.map(editEngineState => {
         StateEngineService.setIsDebug(true) |> ignore;

         let editorStateForComponent = None;
         let scene = editEngineState |> SceneEngineService.getSceneGameObject;
         let (_editorStateForComponent, editEngineState, box) =
           editEngineState
           |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(
                editorStateForComponent,
              );
         let (_editorStateForComponent, editEngineState, camera) =
           editEngineState
           |> DefaultSceneUtils.createDefaultScene(editorStateForComponent);
         let (editorState, editEngineState) =
           editEngineState |> DefaultSceneUtils.computeDiffValue(editorState);

         let editEngineState =
           _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(
             editEngineState,
           );

         let editEngineState = _setIMGUIFunc(scene, editEngineState);

         let editEngineState =
           editEngineState
           |> GameObjectEngineService.setGameObjectName("scene", scene)
           |> GameObjectUtils.setParentKeepOrder(camera, box)
           |> DirectorEngineService.init;

         editEngineState
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEditEngineState;

         editorState |> StateEditorService.setState |> ignore;
       })
    |> WonderBsMost.Most.concat(
         _getLoadData("run")
         |> WonderBsMost.Most.map(runEngineState => {
              let editorState = StateEditorService.getState();
              let editorStateForComponent = Some(editorState);

              let scene =
                runEngineState |> SceneEngineService.getSceneGameObject;
              let (editorStateForComponent, runEngineState, _) =
                runEngineState
                |> DefaultSceneUtils.createDefaultScene(
                     editorStateForComponent,
                   );

              let runEngineState =
                _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent(
                  runEngineState,
                );

              let runEngineState =
                runEngineState
                |> GameObjectEngineService.setGameObjectName("scene", scene)
                |> DirectorEngineService.init;

              runEngineState
              |> DirectorEngineService.loopBody(0.)
              |> StateLogicService.setRunEngineState;

              switch (editorStateForComponent) {
              | None => editorState |> StateEditorService.setState |> ignore
              | Some(editorState) =>
                editorState |> StateEditorService.setState |> ignore
              };
            }),
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => StateEditorService.getState() |> resolve)
  );

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_(editorState =>
       editorState |> StateEditorService.setState |> resolve
     );