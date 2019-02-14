open AddGameObjectType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = addGameObjectType;
  type dataTuple = unit;
  type return = unit;

  let _createGameObjectByType = (gameObjectType, (editorState, engineState)) => {
    let defaultLightMaterialData =
      MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(
        editorState,
      );

    switch (gameObjectType) {
    | Cube =>
      let defaultCubeGeometry =
        GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
          editorState,
        );

      PrimitiveLogicService.createCube(
        (defaultCubeGeometry, defaultLightMaterialData),
        editorState,
        engineState,
      );

    | Sphere =>
      let defaultSphereGeometry =
        GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
          editorState,
        );

      PrimitiveLogicService.createSphere(
        (defaultSphereGeometry, defaultLightMaterialData),
        editorState,
        engineState,
      );

    | EmptyGameObject =>
      PrimitiveLogicService.createEmptyGameObject(editorState, engineState)
    };
  };

  let _addToGameObject =
      (newGameObject, targetGameObject, (editorState, engineState)) => {
    let editorState =
      editorState
      |> SceneTreeEditorService.setIsShowChildren(
           newGameObject,
           SceneTreeEditorService.getDefaultIsShowChildren(),
         )
      |> SceneTreeEditorService.setIsShowChildren(targetGameObject, true);

    let engineState =
      SceneUtils.initGameObjectAndAddChild(
        targetGameObject,
        newGameObject,
        engineState,
      );

    (editorState, engineState);
  };

  let handleSelfLogic = ((uiState, dispatchFunc), gameObjectType, ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (editorState, engineState, newGameObject) =
      _createGameObjectByType(gameObjectType, (editorState, engineState));

    let (editorState, engineState) =
      switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
      | None =>
        let editorState =
          editorState
          |> SceneTreeEditorService.setIsShowChildren(
               newGameObject,
               SceneTreeEditorService.getDefaultIsShowChildren(),
             );

        let engineState =
          SceneUtils.initGameObjectAndAddChild(
            SceneEngineService.getSceneGameObject(engineState),
            newGameObject,
            engineState,
          );

        (editorState, engineState);

      | Some(currentSceneTreeNode) =>
        _addToGameObject(
          newGameObject,
          currentSceneTreeNode,
          (editorState, engineState),
        )
      };

    StateLogicService.setState((editorState, engineState));

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);