open Js.Promise;

open Wonderjs;

open IMGUIType;

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

         let editEngineState =
           ManageIMGUIEngineService.setIMGUIFunc(
             scene |> Obj.magic,
             Obj.magic((. scene, apiJsObj, state) => {
               let camera =
                 state
                 |> GameObjectUtils.getChildren(scene)
                 |> WonderEditor.ArrayService.getFirst;

               let apiJsObj = Obj.magic(apiJsObj);
               let imageFunc = apiJsObj##image;
               let (x, y, z) =
                 state
                 |> TransformEngineService.getPosition(
                      GameObjectComponentEngineService.getTransformComponent(
                        camera,
                        state,
                      ),
                    );

               let (x, y) =
                 state
                 |> CoordinateEngineService.convertWorldToScreen(
                      state
                      |> GameObjectComponentEngineService.getBasicCameraViewComponent(
                           camera,
                         ),
                      state
                      |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
                           camera,
                         ),
                      (x, y, z, 553.0, 427.0),
                    );

               WonderLog.Log.print((x, y)) |> ignore;

               let imageX1 = 0;
               let imageY1 = 0;
               let imageWidth1 = 80;
               let imageHeight1 = 80;

               let state =
                 imageFunc(.
                   (x, y, imageWidth1, imageHeight1),
                   (0., 0., 1., 1.),
                   "directionLight",
                   state,
                 );

               state;
             }),
             editEngineState,
           );

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