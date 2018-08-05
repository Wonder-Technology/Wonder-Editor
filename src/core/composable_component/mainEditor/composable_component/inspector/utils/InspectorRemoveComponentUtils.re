open InspectorComponentType;

open Wonderjs;

open CameraGroupType;

let removeComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  /* | MeshRenderer =>
    let meshRenderer =
      engineState
      |> GameObjectComponentEngineService.getMeshRendererComponent(
           currentSceneTreeNode,
         );
    (editorState, engineState)
    |> GameObjectLogicService.disposeMeshRendererComponent(
         currentSceneTreeNode,
         meshRenderer,
       ); */
  /* | RenderGroup => 
    WonderLog.Log.print("123"); */


  | Light =>
    let lightType =
      MainEditorLightUtils.getLightTypeByGameObject(
        currentSceneTreeNode,
        engineState,
      );

    (editorState, engineState)
    |> MainEditorLightUtils.disposeLightByLightType(
         lightType,
         currentSceneTreeNode,
       );

  | CameraGroup =>
    let engineState =
      CameraEngineService.hasUnActiveCameraGroupAndSetCurrentCamera(
        currentSceneTreeNode,
        engineState,
      );

    (editorState, engineState)
    |> GameObjectLogicService.disposeCameraGroupComponent(
         currentSceneTreeNode,
         CameraGroupEngineService.getCameraGroupComponents(
           currentSceneTreeNode,
           (
             GameObjectComponentEngineService.getBasicCameraViewComponent,
             GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent,
           ),
           engineState,
         ),
       );

  | ArcballCameraController =>
    let arcballCameraController =
      engineState
      |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
           currentSceneTreeNode,
         );

    (editorState, engineState)
    |> GameObjectLogicService.disposeArcballCameraControllerComponent(
         currentSceneTreeNode,
         arcballCameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="removeComponentByType",
        ~description=
          {j|the type_:$type_ in InspectorComponentType is can't remove|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };