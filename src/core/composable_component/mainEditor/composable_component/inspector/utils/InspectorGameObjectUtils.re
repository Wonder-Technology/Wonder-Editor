open InspectorComponentType;

let buildComponentBox =
    (
      (store, dispatchFunc),
      (name, type_, gameObject),
      (isDisposable, isShowComponent),
      buildComponentFunc,
    ) =>
  <ComponentBox
    key=(DomHelper.getRandomKey())
    reduxTuple=(store, dispatchFunc)
    header=name
    isDisposable
    isShowComponent
    type_
    gameObject
    gameObjectUIComponent=(
      buildComponentFunc((store, dispatchFunc), gameObject)
    )
  />;
let _buildTransformFunc = ((store, dispatchFunc), gameObject) =>
  <MainEditorTransform
    key=(DomHelper.getRandomKey())
    store
    dispatchFunc
    gameObject
    transformComponent=(
      GameObjectComponentEngineService.unsafeGetTransformComponent(gameObject)
      |> StateLogicService.getEngineStateToGetData
    )
  />;

let _buildLightFunc = ((store, dispatchFunc), gameObject) =>
  <MainEditorLight key=(DomHelper.getRandomKey()) store dispatchFunc />;

let _buildSouceInstanceFunc = ((store, dispatchFunc), gameObject) =>
  <div key=(DomHelper.getRandomKey())>
    (DomHelper.textEl("simulate source instance"))
  </div>;

let _buildRenderGroupFunc = ((store, dispatchFunc), gameObject) =>
  <MainEditorRenderGroup store dispatchFunc currentSceneTreeNode=gameObject />;

let _buildGeometryFunc = ((store, dispatchFunc), gameObject) =>
  <MainEditorGeometry
    store
    dispatchFunc
    currentSceneTreeNode=gameObject
    geometryComponent=(
      GameObjectComponentEngineService.unsafeGetGeometryComponent(gameObject)
      |> StateLogicService.getEngineStateToGetData
    )
  />;

let _buildCameraGroupFunc = ((store, dispatchFunc), gameObject) =>
  <MainEditorCameraGroup store dispatchFunc />;

let _buildArcballCamera = ((store, dispatchFunc), gameObject) =>
  <MainEditorArcballCamera
    store
    dispatchFunc
    arcballCameraController=(
      GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
        gameObject,
      )
      |> StateLogicService.getEngineStateToGetData
    )
  />;
let buildComponentUIComponent = ((store, dispatchFunc), type_, gameObject) =>
  switch (type_) {
  | Transform =>
    _buildTransformFunc
    |> buildComponentBox(
         (store, dispatchFunc),
         ("Transform", type_, gameObject),
         (
           false,
           StoreUtils.geGameObjectisShowComponentFromStore(
             store,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | Light =>
    _buildLightFunc
    |> buildComponentBox(
         (store, dispatchFunc),
         ("Light", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             store,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | RenderGroup =>
    _buildRenderGroupFunc
    |> buildComponentBox(
         (store, dispatchFunc),
         ("RenderGroup", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             store,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | Geometry =>
    _buildGeometryFunc
    |> buildComponentBox(
         (store, dispatchFunc),
         ("Geometry", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             store,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | SourceInstance => ReasonReact.null
  /* _buildSouceInstanceFunc
     |> buildComponentBox((type_, component), (store, dispatchFunc), true) */

  | CameraGroup =>
    _buildCameraGroupFunc
    |> buildComponentBox(
         (store, dispatchFunc),
         ("Camera Group", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             store,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | ArcballCameraController =>
    _buildArcballCamera
    |> buildComponentBox(
         (store, dispatchFunc),
         ("ArcballCameraController", type_, gameObject),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             store,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )
  };