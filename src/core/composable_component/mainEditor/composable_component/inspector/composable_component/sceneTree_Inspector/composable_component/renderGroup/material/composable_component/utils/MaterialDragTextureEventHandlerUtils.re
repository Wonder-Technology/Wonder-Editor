let _handleGeometryAddMap =
    (
      (geometryComponent, materialComponent),
      textureComponent,
      handleSetMapFunc,
      (editorState, engineState),
    ) =>
  switch (geometryComponent) {
  | None => handleSetMapFunc(materialComponent, textureComponent, engineState)
  | Some(geometryComponent)
      when
        GeometryEngineService.getGeometryTexCoords(
          geometryComponent,
          engineState,
        )
        |> GeometryService.hasTexCoords =>
    handleSetMapFunc(materialComponent, textureComponent, engineState)
  | _ =>
    ConsoleUtils.warn(
      {j|the geometry:$geometryComponent have no texCoords|j},
      editorState,
    );

    engineState;
  };

let handleSelfLogic =
    (
      (store, dispatchFunc),
      materialComponent,
      draggedNodeId,
      handleSetMapFunc,
    ) => {
  StateEditorService.getState()
  |> OperateTreeAssetEditorService.unsafeFindNodeById(draggedNodeId)
  |> (
    /* ({textureComponent}: NodeAssetType.textureNodeData) => { */
    textureNode => {
      let editorState = StateEditorService.getState();
      let gameObject =
        SceneTreeEditorService.getCurrentSceneTreeNode(editorState);
      let engineState = StateEngineService.unsafeGetState();

      let {textureComponent}: NodeAssetType.textureNodeData =
        TextureNodeAssetService.getNodeData(textureNode);

      let engineState =
        switch (gameObject) {
        | None =>
          handleSetMapFunc(materialComponent, textureComponent, engineState)
        | Some(gameObject) =>
          _handleGeometryAddMap(
            (
              GameObjectComponentEngineService.getGeometryComponent(
                gameObject,
                engineState,
              ),
              materialComponent,
            ),
            textureComponent,
            handleSetMapFunc,
            (editorState, engineState),
          )
        };

      engineState |> StateEngineService.setState |> ignore;
    }
  );

  /* dispatchFunc(
    AppStore.UpdateAction(
      Update([|UpdateStore.Project, UpdateStore.Inspector|]),
    ),
  )
  |> ignore; */
};