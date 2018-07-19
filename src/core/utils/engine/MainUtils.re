open Js.Promise;

let _getLoadData = type_ => {
  let engineDataDir = "./node_modules/wonder.js/data/";
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

let init = editorState =>
  _getLoadData("edit")
  |> WonderBsMost.Most.map(editEngineState => {
       StateEngineService.setIsDebug(true) |> ignore;
       let (editEngineState, scene) =
         GameObjectEngineService.create(editEngineState);
       let (editEngineState, box) =
         editEngineState
         |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(
              scene,
            );
       let (editorState, editEngineState) =
         editEngineState |> DefaultSceneUtils.computeDiffValue(editorState);
       let (editEngineState, camera) =
         editEngineState |> DefaultSceneUtils.createDefaultScene(scene);

       editEngineState
       |> GameObjectEngineService.setGameObjectName("scene", scene)
       |> GameObjectUtils.setParentKeepOrder(camera, box)
       |> DirectorEngineService.init
       |> DirectorEngineService.loopBody(0.)
       |> StateLogicService.setEditEngineState;
       editorState |> StateEditorService.setState |> ignore;
       ();
     })
  |> WonderBsMost.Most.concat(
       _getLoadData("run")
       |> WonderBsMost.Most.map(runEngineState => {
            let editorState = StateEditorService.getState();
            let (runEngineState, scene) =
              GameObjectEngineService.create(runEngineState);
            let (runEngineState, _) =
              runEngineState |> DefaultSceneUtils.createDefaultScene(scene);

            runEngineState
            |> GameObjectEngineService.setGameObjectName("scene", scene)
            |> DirectorEngineService.init
            |> DirectorEngineService.loopBody(0.)
            |> StateLogicService.setRunEngineState;

            editorState
            |> SceneEditorService.setScene(scene)
            |> StateEditorService.setState
            |> ignore;
            ();
          }),
     )
  |> WonderBsMost.Most.drain
  |> then_(_ => StateEditorService.getState() |> resolve);

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_(editorState =>
       editorState |> StateEditorService.setState |> resolve
     );