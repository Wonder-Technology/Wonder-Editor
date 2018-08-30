open AddGameObjectType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = addGameObjectType;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), type_, ()) => {
    let newGameObject =
      switch (type_) {
      | Box =>
        let editorState = StateEditorService.getState();

        let runCubeGeometry =
          editorState
          |> AssetGeometryDataEditorService.getGeometryData
          |> (({defaultCubeGeometryIndex}) => defaultCubeGeometryIndex);

        SceneUtils.addGameObject(
          PrimitiveEngineService.createBoxForEditEngineState(
            StateLogicService.getEditEngineComponent(
              DiffType.Geometry,
              runCubeGeometry,
            ),
          ),
          PrimitiveEngineService.createBoxForRunEngineState(runCubeGeometry),
        );
      | EmptyGameObject =>
        SceneUtils.addGameObject(
          PrimitiveEngineService.createEmptyGameObjectForEditEngineState,
          PrimitiveEngineService.createEmptyGameObjectForRunEngineState,
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