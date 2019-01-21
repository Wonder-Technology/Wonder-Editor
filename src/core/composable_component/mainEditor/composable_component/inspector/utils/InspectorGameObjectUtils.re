open InspectorComponentType;

let buildComponentBox =
    (
      (uiState, dispatchFunc),
      (name, type_, gameObject),
      (isDisposable, isShowComponent),
      buildComponentFunc,
    ) =>
  <ComponentBox
    key=(DomHelper.getRandomKey())
    reduxTuple=(uiState, dispatchFunc)
    header=name
    isDisposable
    isShowComponent
    type_
    gameObject
    gameObjectUIComponent=(
      buildComponentFunc((uiState, dispatchFunc), gameObject)
    )
  />;
let _buildTransformFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorTransform
    key=(DomHelper.getRandomKey())
    uiState
    dispatchFunc
    gameObject
    transformComponent=(
      GameObjectComponentEngineService.unsafeGetTransformComponent(gameObject)
      |> StateLogicService.getEngineStateToGetData
    )
  />;

let _buildLightFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorLight key=(DomHelper.getRandomKey()) uiState dispatchFunc />;

let _buildSouceInstanceFunc = ((uiState, dispatchFunc), gameObject) =>
  <div key=(DomHelper.getRandomKey())>
    (DomHelper.textEl("simulate source instance"))
  </div>;

let _buildRenderGroupFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorRenderGroup uiState dispatchFunc currentSceneTreeNode=gameObject />;

let _buildGeometryFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorGeometry
    uiState
    dispatchFunc
    currentSceneTreeNode=gameObject
    geometryComponent=(
      GameObjectComponentEngineService.unsafeGetGeometryComponent(gameObject)
      |> StateLogicService.getEngineStateToGetData
    )
    isShowGeometryGroup=false
  />;

let _buildCameraGroupFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorCameraGroup uiState dispatchFunc />;

let _buildArcballCamera = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorArcballCameraController
    uiState
    dispatchFunc
    arcballCameraController=(
      GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
        gameObject,
      )
      |> StateLogicService.getEngineStateToGetData
    )
  />;
let buildComponentUIComponent = ((uiState, dispatchFunc), type_, gameObject) =>
  switch (type_) {
  | Transform =>
    _buildTransformFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         ("Transform", type_, gameObject),
         (
           false,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | Light =>
    _buildLightFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         ("Light", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | RenderGroup =>
    _buildRenderGroupFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         ("RenderGroup", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | Geometry =>
    _buildGeometryFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         ("Geometry", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | SourceInstance => ReasonReact.null
  /* _buildSouceInstanceFunc
     |> buildComponentBox((type_, component), (uiState, dispatchFunc), true) */

  | CameraGroup =>
    _buildCameraGroupFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         ("Camera Group", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | ArcballCameraController =>
    _buildArcballCamera
    |> buildComponentBox(
         (uiState, dispatchFunc),
         ("ArcballCameraController", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )
  };