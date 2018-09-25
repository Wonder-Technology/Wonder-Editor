module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;
  let _handleSetMap =
      (materialGameObjects, materialComponent, mapId, engineState) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        materialComponent,
        engineState,
      )
    ) {
    | None =>
      let color =
        LightMaterialEngineService.getLightMaterialDiffuseColor(
          materialComponent,
        )
        |> StateLogicService.getEngineStateToGetData;

      OperateTextureLogicService.replaceMaterialComponentFromNoMapToHasMap(
        (materialGameObjects, materialComponent, mapId),
        color,
        (
          GameObjectComponentEngineService.removeLightMaterialComponent,
          OperateLightMaterialLogicService.setLightMaterialColor,
          OperateLightMaterialLogicService.createLightMaterial,
          OperateLightMaterialLogicService.addLightMaterial,
        ),
        OperateLightMaterialLogicService.setLightMaterialMapToEngineState,
        engineState,
      );

    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRereshEngineState(
        materialComponent,
        mapId,
        OperateLightMaterialLogicService.setLightMaterialMapToEngineState,
        engineState,
      )
    };

  let _handleGeometryAddMap =
      (
        materialGameObjects,
        (geometryComponent, materialComponent),
        mapId,
        engineState,
      ) =>
    engineState
    |> GeometryEngineService.getGeometryTexCoords(geometryComponent)
    |> GeometryService.hasTexCoords ?
      _handleSetMap(
        materialGameObjects,
        materialComponent,
        mapId,
        engineState,
      ) :
      {
        WonderLog.Log.warn(
          {j|the geometry:$geometryComponent have no texCoords|j},
        );

        engineState;
      };

  let handleSelfLogic = ((store, dispatchFunc), materialComponent, dragedId) => {
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
          GameObjectComponentEngineService.hasGeometryComponent(
            gameObject,
            engineState,
          ) ?
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
              engineState,
            ) :
            engineState;

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
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);