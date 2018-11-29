open Wonderjs;

open InspectorComponentType;

let _addRenderGroup = (currentSceneTreeNode, (editorState, engineState)) => {
  let defaultLightMaterial =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);
  let (engineState, meshRenderer) =
    MeshRendererEngineService.create(engineState);
  let renderGroup =
    RenderGroupEngineService.buildRenderGroup(
      meshRenderer,
      defaultLightMaterial,
    );

  (editorState, engineState)
  |> GameObjectLogicService.addRenderGroup(
       currentSceneTreeNode,
       renderGroup,
       (
         GameObjectAPI.addGameObjectMeshRendererComponent,
         GameObjectAPI.addGameObjectLightMaterialComponent,
       ),
     );
};

let _addGeometry = (currentSceneTreeNode, (editorState, engineState)) => {
  let defaultCubeGeometry =
    GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    );

  (editorState, engineState)
  |> GameObjectLogicService.addGeometry(
       currentSceneTreeNode,
       defaultCubeGeometry,
     );
};

let _addLight = (currentSceneTreeNode, (editorState, engineState)) =>
  engineState |> DirectionLightEngineService.isMaxCount ?
    {
      ConsoleUtils.warn(
        "the direction light count is exceed max count !",
        editorState,
      );

      (editorState, engineState);
    } :
    {
      let (engineState, directionLightComponent) =
        engineState |> DirectionLightEngineService.create;

      (editorState, engineState)
      |> GameObjectLogicService.addDirectionLight(
           currentSceneTreeNode,
           directionLightComponent,
         )
      |> (
        ((editorState, engineState)) => (
          editorState,
          engineState
          |> SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials,
        )
      );
    };

let _addArcballCameraController =
    (currentSceneTreeNode, (editorState, engineState)) => {
  let (engineState, cameraController) =
    engineState |> ArcballCameraEngineService.create;

  let engineState =
    StateEditorService.getIsRun()
    && engineState
    |> GameObjectComponentEngineService.hasBasicCameraViewComponent(
         currentSceneTreeNode,
       )
    && engineState
    |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         currentSceneTreeNode,
       )
    |> BasicCameraViewEngineService.isActiveBasicCameraView(_, engineState) ?
      ArcballCameraEngineService.bindArcballCameraControllerEventForGameView(
        cameraController,
        engineState,
      ) :
      engineState;

  (editorState, engineState)
  |> GameObjectLogicService.addArcballCameraController(
       currentSceneTreeNode,
       cameraController,
     );
};

let addComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    _addRenderGroup(currentSceneTreeNode, (editorState, engineState))
  | Geometry =>
    _addGeometry(currentSceneTreeNode, (editorState, engineState))
  | Light => _addLight(currentSceneTreeNode, (editorState, engineState))
  | CameraGroup =>
    let (engineState, cameraComponentRecord) =
      CameraEngineService.createCameraGroup(engineState);

    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroup(
         currentSceneTreeNode,
         cameraComponentRecord,
       );

  | ArcballCameraController =>
    _addArcballCameraController(
      currentSceneTreeNode,
      (editorState, engineState),
    )
  | _ =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description=
          {j|the type:$type_ in inspectorComponentType can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
      editorState,
    );

    (editorState, engineState);
  };