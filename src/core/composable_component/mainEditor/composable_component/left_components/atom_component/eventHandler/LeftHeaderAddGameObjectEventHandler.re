open AddGameObjectType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = addGameObjectType;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), gameObjectType, ()) => {
    let newGameObject =
      switch (gameObjectType) {
      | Cude =>
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

      | Sphere =>
        let editorState = StateEditorService.getState();

        let defaultSphereGeometry =
          GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
            editorState,
          );

        let defaultLightMaterialData =
          MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(
            editorState,
          );

        SceneUtils.addGameObject(
          PrimitiveEngineService.createSphere((
            defaultSphereGeometry,
            defaultLightMaterialData,
          )),
        );

      | EmptyGameObject =>
        SceneUtils.addGameObject(PrimitiveEngineService.createEmptyGameObject)
      };

    SceneTreeEditorService.setIsShowChildren(
      newGameObject,
      SceneTreeEditorService.getDefaultIsShowChildren(),
    )
    |> StateLogicService.getAndSetEditorState;

    let engineState = StateEngineService.unsafeGetState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);