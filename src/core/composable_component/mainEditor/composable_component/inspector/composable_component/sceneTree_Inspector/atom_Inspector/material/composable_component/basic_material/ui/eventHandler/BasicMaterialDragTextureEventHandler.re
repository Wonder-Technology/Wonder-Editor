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
      OperateTextureLogicService.replaceMaterialComponentToHasMapOne(
        gameObject,
        materialComponent,
        mapId,
        (
          OperateBasicMaterialLogicService.disposeBasicMaterial,
          OperateBasicMaterialLogicService.setBasicMaterialColor,
          OperateBasicMaterialLogicService.createBasicMaterial,
          OperateBasicMaterialLogicService.addBasicMaterial,
        ),
        OperateBasicMaterialLogicService.setBasicMaterialMapToEngineState,
      )

    | Some(_map) =>
      OperateTextureLogicService.changeTextureMapAndRereshEngineState(
        materialComponent,
        mapId,
        OperateBasicMaterialLogicService.setBasicMaterialMapToEngineState,
      )
    };
  /*
   todo implement when implement "import model" feature

   let handleCustomGeometryAddMap =
               (gameObject, materialComponent, mapId, engineStateToGetData) =>
             engineStateToGetData
             |> GameObjectComponentEngineService.getGeometryComponent(gameObject)
             |. GeometryEngineService.getCustomGeometryTexCoords(engineStateToGetData)
             |> GeometryService.hasTexCoords ?
               _handleSetMap(
                 gameObject,
                 materialComponent,
                 mapId,
                 engineStateToGetData,
               ) :
            WonderLog.Log.warn({j|the gameObject:$gameObject have no texCoords|j});
      */

  let _handleBoxGeometryAddMap =
      (gameObject, materialComponent, mapId, engineStateToGetData) =>
    engineStateToGetData
    |> GeometryEngineService.getBoxGeometryTexCoords
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

        GameObjectComponentEngineService.hasBoxGeometryComponent(
          gameObject,
          engineStateToGetData,
        ) ?
          _handleBoxGeometryAddMap(
            gameObject,
            materialComponent,
            textureIndex,
            engineStateToGetData,
          ) :
          /* handleCustomGeometryAddMap(
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