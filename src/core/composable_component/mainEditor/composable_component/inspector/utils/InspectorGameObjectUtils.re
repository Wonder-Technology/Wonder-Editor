open InspectorComponentType;

let buildComponentBox =
    (
      (name, component),
      (store, dispatchFunc),
      (type_, gameObject),
      isClosable,
      buildComponentFunc,
    ) =>
  <ComponentBox
    key=(DomHelper.getRandomKey())
    reduxTuple=(store, dispatchFunc)
    header=name
    isClosable
    type_
    gameObject
    gameObjectUIComponent=(
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

let _buildCameraGroupFunc = ((store, dispatchFunc), component) =>
  <div key=(DomHelper.getRandomKey())>
    (DomHelper.textEl("simulate camera component"))
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
         (type_, gameObject),
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
         (type_, gameObject),
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
         (type_, gameObject),
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
         (type_, gameObject),
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
         (type_, gameObject),
         false,
       )

  | SourceInstance => ReasonReact.nullElement
  /* _buildSouceInstanceFunc
     |> buildComponentBox((type_, component), (store, dispatchFunc), true) */

  | CameraGroup =>
    /* TODO need fix with camera */
    _buildCameraGroupFunc
    |> buildComponentBox(
         (
           "Camera Group",
           engineStateToGetData
           |> GameObjectComponentEngineService.getBasicCameraViewComponent(
                gameObject,
              ),
         ),
         (store, dispatchFunc),
         (type_, gameObject),
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
         (type_, gameObject),
         true,
       )
  };
};