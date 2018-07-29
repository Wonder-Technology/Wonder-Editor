
open InspectorComponentType;



  let buildComponentBox =
      (
        (type_, component),
        (store, dispatchFunc),
        isClosable,
        buildComponentFunc,
      ) =>
    <ComponentBox
      key=(DomHelper.getRandomKey())
      header=type_
      isClosable
      gameObjectComponent=(
        buildComponentFunc((store, dispatchFunc), component)
      )
    />;
  let _buildTransformFunc = ((store, dispatchFunc), component) =>
    <MainEditorTransform
      key=(DomHelper.getRandomKey())
      store
      dispatchFunc
      transformComponent=component
    />;

  let _buildMaterialFunc = ((store, dispatchFunc), component) =>
    <MainEditorMaterial key=(DomHelper.getRandomKey()) store dispatchFunc />;

  let _buildLightFunc = ((store, dispatchFunc), component) =>
    <MainEditorLight key=(DomHelper.getRandomKey()) store dispatchFunc />;

  let _buildSouceInstanceFunc = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate source instance"))
    </div>;

  let _buildMeshRendererFunc = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate Mesh Renderer"))
    </div>;

  let _buildGeometryFunc = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate Geometry"))
    </div>;

  let _buildBasicCameraViewFunc = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate basic camera view"))
    </div>;

  let _buildPerspectiveCameraProjection = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate perspective camera view"))
    </div>;

  let _buildArcballCamera = ((store, dispatchFunc), component) =>
    <MainEditorArcballCamera
      store
      dispatchFunc
      arcballCameraController=component
    />;
  let buildComponentUIComponent = ((store, dispatchFunc), type_, gameObject) => {
    let engineStateToGetData = StateLogicService.getRunEngineState();

    switch (type_) {
    | Transform =>
      _buildTransformFunc
      |> buildComponentBox(
           (
             "Transform",
             engineStateToGetData
             |> GameObjectComponentEngineService.getTransformComponent(
                  gameObject,
                ),
           ),
           (store, dispatchFunc),
           false,
         )

    | Material =>
      _buildMaterialFunc
      |> buildComponentBox(
           (
             "Material",
             engineStateToGetData
             |> MaterialEngineService.getMaterialComponent(gameObject),
           ),
           (store, dispatchFunc),
           true,
         )

    | Light =>
      _buildLightFunc
      |> buildComponentBox(
           (
             "Light",
             engineStateToGetData
             |> LightEngineService.getLightComponent(gameObject),
           ),
           (store, dispatchFunc),
           true,
         )

    | MeshRenderer =>
      _buildMeshRendererFunc
      |> buildComponentBox(
           (
             "MeshRenderer",
             engineStateToGetData
             |> GameObjectComponentEngineService.getMeshRendererComponent(
                  gameObject,
                ),
           ),
           (store, dispatchFunc),
           true,
         )

    | CustomGeometry =>
      _buildGeometryFunc
      |> buildComponentBox(
           (
             "CustomGeometry",
             engineStateToGetData
             |> GameObjectComponentEngineService.getGeometryComponent(
                  gameObject,
                ),
           ),
           (store, dispatchFunc),
           true,
         )

    /* | "sourceInstance" =>
       _buildSouceInstanceFunc
       |> buildComponentBox((type_, component), (store, dispatchFunc), true) */

    | BasicCameraView =>
      _buildBasicCameraViewFunc
      |> buildComponentBox(
           (
             "BasicCameraView",
             engineStateToGetData
             |> GameObjectComponentEngineService.getBasicCameraViewComponent(
                  gameObject,
                ),
           ),
           (store, dispatchFunc),
           true,
         )

    | PerspectiveCameraProjection =>
      _buildPerspectiveCameraProjection
      |> buildComponentBox(
           (
             "PerspectiveCameraProjection",
             engineStateToGetData
             |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
                  gameObject,
                ),
           ),
           (store, dispatchFunc),
           true,
         )

    | ArcballCameraController =>
      _buildArcballCamera
      |> buildComponentBox(
           (
             "ArcballCameraController",
             engineStateToGetData
             |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                  gameObject,
                ),
           ),
           (store, dispatchFunc),
           true,
         )

    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="buildComponentUIComponent",
          ~description={j|the component: $type_ not exist|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|type:$type_|j},
        ),
      )
    };
  };