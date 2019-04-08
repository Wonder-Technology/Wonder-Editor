open InspectorComponentType;

let buildComponentBox =
    (
      (uiState, dispatchFunc),
      (name, type_, gameObject, title),
      (isDisposable, isShowComponent),
      buildComponentFunc,
    ) =>
  <ComponentBox
    key={DomHelper.getRandomKey()}
    reduxTuple=(uiState, dispatchFunc)
    header=name
    isDisposable
    isShowComponent
    type_
    title
    gameObject
    gameObjectUIComponent={
      buildComponentFunc((uiState, dispatchFunc), gameObject)
    }
  />;
let _buildTransformFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorTransform
    key={DomHelper.getRandomKey()}
    uiState
    dispatchFunc
    gameObject
    transformComponent={
      GameObjectComponentEngineService.unsafeGetTransformComponent(gameObject)
      |> StateLogicService.getEngineStateToGetData
    }
  />;

let _buildLightFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorLight key={DomHelper.getRandomKey()} uiState dispatchFunc />;

let _buildSouceInstanceFunc = ((uiState, dispatchFunc), gameObject) =>
  <div key={DomHelper.getRandomKey()}>
    {DomHelper.textEl("simulate source instance")}
  </div>;

let _buildRenderGroupFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorRenderGroup
    uiState
    dispatchFunc
    currentSceneTreeNode=gameObject
  />;

let _buildGeometryFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorGeometry
    uiState
    dispatchFunc
    currentSceneTreeNode=gameObject
    geometryComponent={
      GameObjectComponentEngineService.unsafeGetGeometryComponent(gameObject)
      |> StateLogicService.getEngineStateToGetData
    }
    isShowGeometryGroup=false
  />;

let _buildCameraGroupFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorCameraGroup uiState dispatchFunc />;

let _buildArcballCamera = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorArcballCameraController
    uiState
    dispatchFunc
    arcballCameraController={
      GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
        gameObject,
      )
      |> StateLogicService.getEngineStateToGetData
    }
  />;

let _buildScriptFunc = ((uiState, dispatchFunc), gameObject) =>
  <MainEditorScript
    key={DomHelper.getRandomKey()}
    uiState
    dispatchFunc
    script={
      GameObjectComponentEngineService.unsafeGetScriptComponent(
        gameObject,
      )
      |> StateLogicService.getEngineStateToGetData
    }
  />;

let buildComponentUIComponent =
    ((uiState, dispatchFunc), type_, gameObject, languageType) =>
  switch (type_) {
  | Transform =>
    _buildTransformFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         (
           "Transform",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "transform-describe",
             languageType,
           ),
         ),
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
         (
           "Light",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "light-describe",
             languageType,
           ),
         ),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )

  | Script =>
    _buildScriptFunc
    |> buildComponentBox(
         (uiState, dispatchFunc),
         (
           "Script",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "script-describe",
             languageType,
           ),
         ),
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
         (
           "Render Group",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "render-group-describe",
             languageType,
           ),
         ),
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
         (
           "Geometry",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "geometry-describe",
             languageType,
           ),
         ),
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
         (
           "Camera Group",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "camera-group-describe",
             languageType,
           ),
         ),
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
         (
           "ArcballCameraController",
           type_,
           gameObject,
           LanguageUtils.getInspectorLanguageDataByType(
             "arcball-cameraController-describe",
             languageType,
           ),
         ),
         (
           true,
           StoreUtils.geGameObjectisShowComponentFromStore(
             uiState,
             type_ |> InspectorComponentType.convertComponentTypeToInt,
           ),
         ),
       )
  };