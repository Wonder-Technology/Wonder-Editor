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

        let defaultCubeGeometry =
          GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
            editorState,
          );

        let defaultLightMaterial =
          MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(
            editorState,
          );

        SceneUtils.addGameObject(
          PrimitiveEngineService.createCube((
            defaultCubeGeometry,
            defaultLightMaterial,
          )),
        );
      | EmptyGameObject =>
        SceneUtils.addGameObject(PrimitiveEngineService.createEmptyGameObject)
      };

    let engineState = StateEngineService.unsafeGetState();

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneGraphUtils.buildTreeNode(newGameObject, engineState)
            |> SceneGraphUtils.addTreeNodeSceneGraphData(
                 _,
                 SceneEngineService.getSceneGameObject(engineState),
                 store |> StoreUtils.unsafeGetSceneGraphDataFromStore,
                 engineState,
               ),
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