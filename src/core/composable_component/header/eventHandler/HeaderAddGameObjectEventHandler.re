open AddGameObjectType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = addGameObjectType;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), type_, ()) => {
    let newGameObject =
      switch (type_) {
      | Box =>
        let editorState = StateEditorService.getState();

        let defaultCubeGeometry =
          GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
            editorState,
          );

        let defaultLightMaterialData =
          MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(
            editorState,
          );

        SceneUtils.addGameObject(
          PrimitiveEngineService.createCube((
            defaultCubeGeometry,
            defaultLightMaterialData,
          )),
        );
      | EmptyGameObject =>
        SceneUtils.addGameObject(PrimitiveEngineService.createEmptyGameObject)
      };

    let engineState = StateEngineService.unsafeGetState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);