open InspectorComponentType;

open CameraComponentType;

let removeComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | MeshRenderer =>
    let meshRenderer =
      engineState
      |> GameObjectComponentEngineService.getMeshRendererComponent(
           currentSceneTreeNode,
         );
    (editorState, engineState)
    |> GameObjectLogicService.disposeMeshRendererComponent(
         currentSceneTreeNode,
         meshRenderer,
       );
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

  | Material =>
    let materialType =
      MainEditorMaterialUtils.getMaterialTypeByGameObject(
        currentSceneTreeNode,
        engineState,
      );

    (editorState, engineState)
    |> MainEditorMaterialUtils.disposeMaterialByMaterialType(
         materialType,
         currentSceneTreeNode,
       );

  | Camera =>

  
    let basicCameraView =
      engineState
      |> GameObjectComponentEngineService.getBasicCameraViewComponent(
           currentSceneTreeNode,
         );

    let engineState =
      BasicCameraViewEngineService.isActiveBasicCameraView(
        basicCameraView,
        engineState,
      ) ?
        {
          let removedActiveBasicCameraViewArr =
            engineState
            |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
            |> Js.Array.filter(component => component != basicCameraView);

          WonderLog.Log.print(removedActiveBasicCameraViewArr) |> ignore;

          switch (removedActiveBasicCameraViewArr |> Js.Array.length) {
          | 0 =>
            WonderLog.Log.fatal(
              WonderLog.Log.buildFatalMessage(
                ~title="removeComponent",
                ~description={j|can't remove last camera|j},
                ~reason="",
                ~solution={j||j},
                ~params={j||j},
              ),
            )
          | _ =>
            removedActiveBasicCameraViewArr
            |> WonderLog.Log.print
            |> ArrayService.getLast
            |> (
              basicCameraView =>
                engineState
                |> BasicCameraViewEngineService.activeBasicCameraView(
                     basicCameraView,
                   )
            )
          };
        } :
        engineState;

    (editorState, engineState)
    |> GameObjectLogicService.disposeCameraComponent(
         currentSceneTreeNode,
         {
           basicCameraView,
           perspectiveCameraProjection:
             engineState
             |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
                  currentSceneTreeNode,
                ),
         },
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