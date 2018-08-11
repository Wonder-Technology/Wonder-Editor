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
  let engineState = StateLogicService.getRunEngineState();
  let currentGameObjectBasicCameraViewComponent =
    engineState
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(
         SceneEditorService.unsafeGetCurrentSceneTreeNode
         |> StateLogicService.getEditorState,
       );
  let isCurrentCamera =
    BasicCameraViewEngineService.isActiveBasicCameraView(
      currentGameObjectBasicCameraViewComponent,
      engineState,
    );

      /* TODO remove print */
  <article key="MainEditorCameraView" className="wonder-camera-view">
    <Select
      label="type : "
      options=(MainEditorCameraViewUtils.getCameraViewOptions())
      selectedKey=(BasicCameraView |> convertCameraViewTypeToInt)
      onChange=(value => WonderLog.Log.print(value) |> ignore)
    />
    <div className="">
      <div className=""> (DomHelper.textEl("currentCamera : ")) </div>
      <input
        style=(ReactDOMRe.Style.make(~width="35px", ~height="35px", ()))
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
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};