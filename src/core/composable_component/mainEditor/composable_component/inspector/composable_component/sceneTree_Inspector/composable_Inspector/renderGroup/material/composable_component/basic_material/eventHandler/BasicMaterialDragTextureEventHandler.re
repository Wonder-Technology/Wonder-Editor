open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = int;
  let _handleSetMap =
      (gameObject, materialComponent, mapId, engineStateToGetData) =>
    switch (
      BasicMaterialEngineService.getMap(
        materialComponent,
        engineStateToGetData,
      )
    ) {
    | None =>
      let color =
        BasicMaterialEngineService.getColor(materialComponent)
        |> StateLogicService.getEngineStateToGetData;

      OperateTextureLogicService.replaceMaterialComponentFromNoMapToHasMap(
        (gameObject, materialComponent, mapId),
        color,
        (
          OperateBasicMaterialLogicService.disposeBasicMaterial,
          OperateBasicMaterialLogicService.setBasicMaterialColor,
          OperateBasicMaterialLogicService.createBasicMaterial,
          OperateBasicMaterialLogicService.addBasicMaterial,
        ),
        OperateBasicMaterialLogicService.setBasicMaterialMapToEngineState,
      );

    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRereshEngineState(
        materialComponent,
        mapId,
        OperateBasicMaterialLogicService.setBasicMaterialMapToEngineState,
      )
    };
  /*
   todo implement when implement "import model" feature

   let handleGeometryAddMap =
               (gameObject, materialComponent, mapId, engineStateToGetData) =>
             engineStateToGetData
             |> GameObjectComponentEngineService.getGeometryComponent(gameObject)
             |. GeometryEngineService.getGeometryTexCoords(engineStateToGetData)
             |> GeometryService.hasTexCoords ?
               _handleSetMap(
                 gameObject,
                 materialComponent,
                 mapId,
                 engineStateToGetData,
               ) :
            WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});
      */

  let _handleGeometryAddMap =
      (
        gameObject,
        geometryComponent,
        materialComponent,
        mapId,
        engineStateToGetData,
      ) =>
    engineStateToGetData
    |> GeometryEngineService.getGeometryTexCoords(geometryComponent)
    |> GeometryService.hasTexCoords ?
      _handleSetMap(
        gameObject,
        materialComponent,
        mapId,
        engineStateToGetData,
      ) :
      WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});

  let handleSelfLogic = ((store, dispatchFunc), materialComponent, dragedId) => {
    StateEditorService.getState()
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(dragedId)
    |> (
      ({textureIndex}) => {
        let gameObject =
          SceneEditorService.unsafeGetCurrentSceneTreeNode
          |> StateLogicService.getEditorState;

        let engineStateToGetData = StateLogicService.getRunEngineState();

        /* todo not judge geometry, add map even though has no geometry */
        GameObjectComponentEngineService.hasGeometryComponent(
          gameObject,
          engineStateToGetData,
        ) ?
          _handleGeometryAddMap(
            gameObject,
            GameObjectComponentEngineService.getGeometryComponent(
              gameObject,
              engineStateToGetData,
            ),
            materialComponent,
            textureIndex,
            engineStateToGetData,
          ) :
          /* handleGeometryAddMap(
               gameObject,
               materialComponent,
               result |> OptionService.unsafeGet |> int_of_string,
               engineStateToGetData,
             ); */
          ();
      }
    );

    dispatchFunc(
      AppStore.UpdateAction(
        Update([|UpdateStore.Asset, UpdateStore.Inspector|]),
      ),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);