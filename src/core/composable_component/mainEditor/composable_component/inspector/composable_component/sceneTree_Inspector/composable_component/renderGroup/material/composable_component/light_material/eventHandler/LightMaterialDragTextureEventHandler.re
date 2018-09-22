module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;
  let _handleSetMap = (gameObject, materialComponent, mapId, engineState) =>
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
        (gameObject, materialComponent, mapId),
        color,
        (
          OperateLightMaterialLogicService.disposeLightMaterial,
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
  /*
   todo implement when implement "import model" feature

   let handleGeometryAddMap =
               (gameObject, materialComponent, mapId, engineState) =>
             engineState
             |> GameObjectComponentEngineService.getGeometryComponent(gameObject)
             |. GeometryEngineService.getGeometryTexCoords(engineState)
             |> GeometryService.hasTexCoords ?
               _handleSetMap(
                 gameObject,
                 materialComponent,
                 mapId,
                 engineState,
               ) :
            WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});
      */

  let _handleGeometryAddMap =
      (
        gameObject,
        (geometryComponent, materialComponent),
        mapId,
        engineState,
      ) =>
    engineState
    |> GeometryEngineService.getGeometryTexCoords(geometryComponent)
    |> GeometryService.hasTexCoords ?
      _handleSetMap(gameObject, materialComponent, mapId, engineState) :
      {
        WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});

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

        let engineState =
          GameObjectComponentEngineService.hasGeometryComponent(
            gameObject,
            engineState,
          ) ?
            _handleGeometryAddMap(
              gameObject,
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
            /* handleGeometryAddMap(
                 gameObject,
                 materialComponent,
                 result |> OptionService.unsafeGet |> int_of_string,
                 engineState,
               ); */
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