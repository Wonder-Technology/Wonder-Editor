open MainEditorCameraViewType;

module Method = {
  let setCurrentCamera = ((uiState, dispatchFunc), basicCameraView, event) => {
    let e = event |> ReactEventType.convertReactMouseEventToJsEvent;
    e##target##checked ?
      CameraViewSetCurrentCameraEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (uiState, dispatchFunc),
        (),
        basicCameraView,
      ) :
      ();
  };
};

let component = ReasonReact.statelessComponent("MainEditorCameraView");

let render = ((uiState, dispatchFunc), _self) => {
  let engineState = StateEngineService.unsafeGetState();
  let currentSceneTreeNodeBasicCameraViewComponent =
    engineState
    |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
         |> StateLogicService.getEditorState,
       );
  let isCurrentCamera =
    GameViewEditorService.isActiveBasicCameraView(
      currentSceneTreeNodeBasicCameraViewComponent,
      StateEditorService.getState(),
    );

  let languageType =
    LanguageUtils.getLanguageType(WindowType.window##wonderLanguage);

  <article key="MainEditorCameraView" className="wonder-camera-view">
    <Select
      label="Type"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "view-type-describe",
          languageType,
        )
      }
      options={MainEditorCameraViewUtils.getCameraViewOptions()}
      selectedKey={BasicCameraView |> convertCameraViewTypeToInt}
      onChange={value => ()}
    />
    <div className="inspector-item">
      <div
        className="item-header"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "current-camera-describe",
            languageType,
          )
        }>
        {DomHelper.textEl("CurrentCamera")}
      </div>
      <div className="item-content">
        <input
          type_="checkbox"
          defaultChecked=isCurrentCamera
          onClick={
            Method.setCurrentCamera(
              (uiState, dispatchFunc),
              currentSceneTreeNodeBasicCameraViewComponent,
            )
          }
          disabled=isCurrentCamera
        />
      </div>
    </div>
  </article>;
};

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), self),
};