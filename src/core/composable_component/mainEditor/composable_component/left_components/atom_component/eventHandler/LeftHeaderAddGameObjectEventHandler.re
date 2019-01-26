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
    | Cude =>
      let _defaultCubeGeometry =
        GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
          editorState,
        );

      PrimitiveLogicService.createCube(
        (_defaultCubeGeometry, defaultLightMaterialData),
        editorState,
        engineState,
      );

    | Sphere =>
      let _defaultSphereGeometry =
        GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
          editorState,
        );

      PrimitiveLogicService.createSphere(
        (_defaultSphereGeometry, defaultLightMaterialData),
        editorState,
        engineState,
      );

    | EmptyGameObject =>
      PrimitiveLogicService.createEmptyGameObject(editorState, engineState)
    };
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
          SceneUtils.initGameObjectAndAddToParent(
            SceneEngineService.getSceneGameObject(engineState),
            newGameObject,
            engineState,
          );

        (editorState, engineState);

      | Some(currentSceneTreeNode) =>
        let editorState =
          editorState
          |> SceneTreeEditorService.setIsShowChildren(
               newGameObject,
               SceneTreeEditorService.getDefaultIsShowChildren(),
             )
          |> SceneTreeEditorService.setIsShowChildren(
               currentSceneTreeNode,
               true,
             );

        let engineState =
          SceneUtils.initGameObjectAndAddToParent(
            currentSceneTreeNode,
            newGameObject,
            engineState,
          );

        (editorState, engineState);
      };

    StateLogicService.setState((editorState, engineState));

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);