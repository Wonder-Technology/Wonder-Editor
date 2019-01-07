open MainEditorCameraViewType;

module Method = {
  let setCurrentCamera = ((store, dispatchFunc), basicCameraView, event) => {
    let e = event |> ReactEventType.convertReactMouseEventToJsEvent;
    e##target##checked ?
      CameraViewSetCurrentCameraEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (store, dispatchFunc),
        (),
        basicCameraView,
      ) :
      ();
  };
};

let component = ReasonReact.statelessComponent("MainEditorCameraView");

let render = ((store, dispatchFunc), _self) => {
  let engineState = StateEngineService.unsafeGetState();
  let currentGameObjectBasicCameraViewComponent =
    engineState
    |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
         |> StateLogicService.getEditorState,
       );
  let isCurrentCamera =
    GameViewEditorService.isActiveBasicCameraView(
      currentGameObjectBasicCameraViewComponent,
      StateEditorService.getState(),
    );

  <article key="MainEditorCameraView" className="wonder-camera-view">
    <Select
      label="Type"
      options=(MainEditorCameraViewUtils.getCameraViewOptions())
      selectedKey=(BasicCameraView |> convertCameraViewTypeToInt)
      onChange=(value => ())
    />
    <div className="inspector-item">
      <div className="item-header"> (DomHelper.textEl("CurrentCamera")) </div>
      <div className="item-content">
        <input
          _type="checkbox"
          defaultChecked=isCurrentCamera
          onClick=(
            Method.setCurrentCamera(
              (store, dispatchFunc),
              currentGameObjectBasicCameraViewComponent,
            )
          )
          disabled=isCurrentCamera
        />
      </div>
    </div>
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};