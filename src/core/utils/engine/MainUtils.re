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

let init = editorState =>
  Wonderjs.StateDataMainType.(
    _getLoadData("edit")
    |> WonderBsMost.Most.map(editEngineState => {
         StateEngineService.setIsDebug(true) |> ignore;
         let scene = editEngineState |> SceneEngineService.getSceneGameObject;
         let (editEngineState, box) =
           editEngineState
           |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState;
         let (editorState, editEngineState) =
           editEngineState |> DefaultSceneUtils.computeDiffValue(editorState);
         let (editEngineState, camera) =
           editEngineState |> DefaultSceneUtils.createDefaultScene;

         let editEngineState =
           editEngineState
           |> StateEngineService.setUnsafeGetStateFunc((.) =>
                StateLogicService.getEditEngineState()
              )
           |> StateEngineService.setSetStateFunc((. state) => {
                state
                |> DirectorEngineService.loopBody(0.)
                |> StateLogicService.setEditEngineState;

                state;
              });

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
              let scene =
                runEngineState |> SceneEngineService.getSceneGameObject;
              let (runEngineState, _) =
                runEngineState |> DefaultSceneUtils.createDefaultScene;

              let runEngineState =
                runEngineState
                |> StateEngineService.setUnsafeGetStateFunc((.) =>
                     StateLogicService.getRunEngineState()
                   )
                |> StateEngineService.setSetStateFunc((. state) => {
                     state
                     |> DirectorEngineService.loopBody(0.)
                     |> StateLogicService.setRunEngineState;

                     state;
                   });

              let runEngineState =
                runEngineState
                |> GameObjectEngineService.setGameObjectName("scene", scene)
                |> DirectorEngineService.init;

              runEngineState
              |> DirectorEngineService.loopBody(0.)
              |> StateLogicService.setRunEngineState;

              editorState |> StateEditorService.setState |> ignore;
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