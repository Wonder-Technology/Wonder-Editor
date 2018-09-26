let _handleGeometryAddMap =
    (
      materialGameObjects,
      (geometryComponent, materialComponent),
      mapId,
      handleSetMapFunc,
      engineState,
    ) =>
  switch (geometryComponent) {
  | None =>
    handleSetMapFunc(
      materialGameObjects,
      materialComponent,
      mapId,
      engineState,
    )
  | Some(geometryComponent)
      when
        GeometryEngineService.getGeometryTexCoords(
          geometryComponent,
          engineState,
        )
        |> GeometryService.hasTexCoords =>
    handleSetMapFunc(
      materialGameObjects,
      materialComponent,
      mapId,
      engineState,
    )
  | _ =>
    WonderLog.Log.warn(
      {j|the geometry:$geometryComponent have no texCoords|j},
    );

    engineState;
  };

let handleSelfLogic =
    ((store, dispatchFunc), materialComponent, dragedId, handleSetMapFunc) => {
  StateEditorService.getState()
  |> AssetTextureNodeMapEditorService.getTextureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(dragedId)
  |> (
    ({textureIndex}) => {
      let gameObject =
        SceneEditorService.unsafeGetCurrentSceneTreeNode
        |> StateLogicService.getEditorState;
      let engineState = StateEngineService.unsafeGetState();
      let materialGameObjects = [|gameObject|];

      let engineState =
        _handleGeometryAddMap(
          materialGameObjects,
          (
            GameObjectComponentEngineService.getGeometryComponent(
              gameObject,
              engineState,
            ),
            materialComponent,
          ),
          textureIndex,
          handleSetMapFunc,
          engineState,
        );

      engineState |> StateEngineService.setState |> ignore;
    }
  );

  dispatchFunc(
    AppStore.UpdateAction(
      Update([|UpdateStore.BottomComponent, UpdateStore.Inspector|]),
    ),
  )
  |> ignore;
};