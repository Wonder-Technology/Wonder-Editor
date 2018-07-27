module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = string;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), type_, ()) => {
    let newGameObject =
      switch (type_) {
      | "box" => SceneUtils.addGameObject(PrimitiveEngineService.createBox)
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
              store |> StoreUtils.unsafeGetSceneGraphDataFromStore,
            )
            |> StateLogicService.getEngineStateToGetData,
          ),
        ),
      ),
    )
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);