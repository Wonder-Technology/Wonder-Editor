open Wonderjs;

open InspectorComponentType;

let addComponentByTypeForEditEngineState =
    (type_, currentSceneTreeNode, engineState) =>
  switch (type_) {
  | RenderGroup =>
    let (engineState, renderGroup) =
      RenderGroupEngineService.createRenderGroup(
        (MeshRendererEngineService.create, LightMaterialEngineService.create),
        engineState,
      );

    engineState
    |> GameObjectLogicService.addRenderGroupForEditEngineState(
         currentSceneTreeNode,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       );
  | Geometry =>
    let editorState = StateEditorService.getState();

    let editCubeGeometry =
      editorState
      |> AssetGeometryDataEditorService.getGeometryData
      |> (
        ({cubeGeometryAssetId}) =>
          editorState
          |> AssetGeometryNodeMapEditorService.getGeometryNodeMap
          |> WonderCommonlib.SparseMapService.unsafeGet(cubeGeometryAssetId)
      )
      |> StateLogicService.getEditEngineComponent(DiffType.Geometry);

    engineState
    |> GameObjectLogicService.addGeometryForEditEngineState(
         currentSceneTreeNode,
         editCubeGeometry,
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

        engineState;
      } :
      {
        let (engineState, directionLightComponent) =
          engineState |> DirectionLightEngineService.create;

        engineState
        |> GameObjectLogicService.addDirectionLightForEditEngineState(
             currentSceneTreeNode,
             directionLightComponent,
           )
        |> OperateLightMaterialLogicService.reInitAllMaterials;
      }

  | CameraGroup =>
    let (engineState, cameraComponentRecord) =
      CameraEngineService.createCameraGroup(engineState);

    engineState
    |> GameObjectLogicService.addCameraGroupForEditEngineState(
         currentSceneTreeNode,
         cameraComponentRecord,
       );

  | ArcballCameraController =>
    let (engineState, arcballCameraController) =
      engineState |> ArcballCameraEngineService.create;

    engineState
    |> GameObjectLogicService.addArcballCameraControllerForEditEngineState(
         currentSceneTreeNode,
         arcballCameraController,
       );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByTypeForEditEngineState",
        ~description=
          {j|the type:$type_ in inspectorComponentType is can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };
let addComponentByTypeForRunEngineState =
    (type_, currentSceneTreeNode, (editorState, engineState)) =>
  switch (type_) {
  | RenderGroup =>
    let (engineState, renderGroup) =
      RenderGroupEngineService.createRenderGroup(
        (MeshRendererEngineService.create, LightMaterialEngineService.create),
        engineState,
      );

    (editorState, engineState)
    |> GameObjectLogicService.addRenderGroupForRunEngineState(
         currentSceneTreeNode,
         renderGroup,
         (
           GameObjectAPI.addGameObjectMeshRendererComponent,
           GameObjectAPI.addGameObjectLightMaterialComponent,
         ),
       );

  | Geometry =>
    let editorState = StateEditorService.getState();

    let runCubeGeometry =
      editorState
      |> AssetGeometryDataEditorService.getGeometryData
      |> (
        ({cubeGeometryAssetId}) =>
          editorState
          |> AssetGeometryNodeMapEditorService.getGeometryNodeMap
          |> WonderCommonlib.SparseMapService.unsafeGet(cubeGeometryAssetId)
      );

    (editorState, engineState)
    |> GameObjectLogicService.addGeometryForRunEngineState(
         currentSceneTreeNode,
         runCubeGeometry,
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
        |> GameObjectLogicService.addDirectionLightForRunEngineState(
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
    |> GameObjectLogicService.addCameraGroupForRunEngineState(
         currentSceneTreeNode,
         cameraComponentRecord,
       )
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
    |> GameObjectLogicService.addArcballCameraControllerForRunEngineState(
         currentSceneTreeNode,
         arcballCameraController,
       )
    |> (
      ((editorState, engineState)) => (
        editorState,
        engineState
        |> OperateComponentUtils.handleAddArcballCameraControllerIfInRunMode(
             currentSceneTreeNode,
           ),
      )
    );
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addComponentByTypeForRunEngineState",
        ~description=
          {j|the type:$type_ in inspectorComponentType is can't add |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };