open Wonderjs;

open InspectorComponentType;

let addComponentByType =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    let (engineState, renderGroup) =
      RenderGroupEngineService.createRenderGroup(
        (MeshRendererEngineService.create, LightMaterialEngineService.create),
        engineState,
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
  | Geometry =>
    /* let editorState = StateEditorService.getState(); */

    let defaultCubeGeometry =
      editorState
      |> AssetGeometryDataEditorService.getGeometryData
      |> (({defaultCubeGeometryIndex}) => defaultCubeGeometryIndex);

    (editorState, engineState)
    |> GameObjectLogicService.addGeometry(
         currentSceneTreeNode,
         defaultCubeGeometry,
       );

  | Light =>
    engineState |> DirectionLightEngineService.isMaxCount ?
      {
        Antd.Message.message
        |> Antd.Message.convertToJsObj
        |> (
          messageObj =>
            messageObj##info(
              "the direction light count is exceed max count !",
              4,
            )
        )
        |> ignore;

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
            engineState |> OperateLightMaterialLogicService.reInitAllMaterials,
          )
        );
      }

  | CameraGroup =>
    let (engineState, cameraComponentRecord) =
      CameraEngineService.createCameraGroup(engineState);

    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroup(
         currentSceneTreeNode,
         cameraComponentRecord,
       )
    /* TODO fix here? */
    |> (
      ((editorState, engineState)) => (
        editorState,
        engineState
        |> BasicCameraViewEngineService.activeBasicCameraView(
             GameObjectComponentEngineService.getBasicCameraViewComponent(
               currentSceneTreeNode,
               engineState,
             ),
           )
        |> OperateComponentUtils.handleAddCameraGroupIfInRunMode(
             currentSceneTreeNode,
           ),
      )
    );

  | ArcballCameraController =>
    let (engineState, arcballCameraController) =
      engineState |> ArcballCameraEngineService.create;

    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraController(
         currentSceneTreeNode,
         arcballCameraController,
       );
  /*
   TODO handle this
   |> (
     ((editorState, engineState)) => (
       editorState,
       engineState
       |> OperateComponentUtils.handleAddArcballCameraControllerIfInRunMode(
            currentSceneTreeNode,
          ),
     )
   ); */
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByType",
        ~description=
          {j|the type:$type_ in inspectorComponentType is can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };