module AddGameObjectEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;

  let onClick = ((store, dispatchFunc), type_, ()) => {
    let newGameObject =
      switch (type_) {
      | "box" =>
        SceneUtils.addGameObject(
          SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState,
          PrimitiveEngineService.createBox,
        )
      | _ =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="addGameObject",
            ~description={j|specific type:$type_ should exist|j},
            ~reason="",
            ~solution={j||j},
            ~params={j|type:$type_|j},
          ),
        )
      };

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneTreeUtils.buildSceneGraphDataWithNewGameObject(
              newGameObject,
              store |> SceneTreeUIUtils.unsafeGetSceneGraphDataFromStore,
            )
            |> StateLogicService.getEngineStateToGetData,
          ),
        ),
      ),
    )
    |> ignore;
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(AddGameObjectEventHandler);