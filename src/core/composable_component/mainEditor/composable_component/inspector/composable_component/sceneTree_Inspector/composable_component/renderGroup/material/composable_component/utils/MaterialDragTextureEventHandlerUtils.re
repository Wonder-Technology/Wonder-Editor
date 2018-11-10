let _handleGeometryAddMap =
    (
      (geometryComponent, materialComponent),
      textureComponent,
      handleSetMapFunc,
      engineState,
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
    WonderLog.Log.warn(
      {j|the geometry:$geometryComponent have no texCoords|j},
    );

    engineState;
  };

let handleSelfLogic =
    (
      (store, dispatchFunc),
      materialComponent,
      dragedNodeId,
      handleSetMapFunc,
    ) => {
  StateEditorService.getState()
  |> TextureNodeMapAssetEditorService.getTextureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(dragedNodeId)
  |> (
    ({textureComponent}) => {
      let gameObject =
        SceneEditorService.getCurrentSceneTreeNode
        |> StateLogicService.getEditorState;
      let engineState = StateEngineService.unsafeGetState();

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
            engineState,
          )
        };

      engineState |> StateEngineService.setState |> ignore;
    }
  );

  dispatchFunc(
    AppStore.UpdateAction(
      Update([|UpdateStore.Project, UpdateStore.Inspector|]),
    ),
  )
  |> ignore;
};