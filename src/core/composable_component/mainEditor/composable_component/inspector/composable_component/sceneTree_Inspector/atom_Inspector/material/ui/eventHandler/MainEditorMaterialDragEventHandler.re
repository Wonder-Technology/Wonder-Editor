open DiffType;

module DragEventHandler = {
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
      WonderLog.Log.print("remove material and create material") |> ignore;

      OperateTextureLogicService.setTextureMapToGameObjectMaterial(
        gameObject,
        materialComponent,
        mapId,
      );

    | Some(_map) =>
      WonderLog.Log.print("has material") |> ignore;

      OperateTextureLogicService.changeTextureMapAndRereshEngineState(
        materialComponent,
        mapId,
      );
    };

  let _handleBoxGeometryAddMap =

  /* let handleCustomGeometryAddMap =
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
       _handleNoTexCoords(gameObject); */

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

  let onDrop = ((store, dispatchFunc), materialComponent, dragedId) => {
    StateEditorService.getState()
    |> AssetNodeMapEditorService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(dragedId)
    |> (
      ({name, type_, result}) => {
        let gameObject =
          SceneEditorService.unsafeGetCurrentSceneTreeNode
          |> StateLogicService.getEditorState;

        let engineStateToGetData = StateLogicService.getRunEngineState();

        GameObjectEngineService.hasGameObjectBoxGeometryComponent(
          gameObject,
          engineStateToGetData,
        ) ?
          _handleBoxGeometryAddMap(
            gameObject,
            materialComponent,
            result |> OptionService.unsafeGet |> int_of_string,
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
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(DragEventHandler);
