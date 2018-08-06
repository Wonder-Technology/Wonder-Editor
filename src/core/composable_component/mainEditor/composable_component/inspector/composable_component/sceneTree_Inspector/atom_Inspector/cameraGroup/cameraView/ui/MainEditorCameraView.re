open MainEditorCameraViewType;

module Method = {
  let setCurrentCamera =
      ((store, dispatchFunc), basicCameraView, engineState, event) => {
    let e = event |> ReactEventType.convertReactMouseEventToJsEvent;
    e##target##checked ?
      engineState
      |> BasicCameraViewEngineService.activeBasicCameraView(basicCameraView)
      |> StateLogicService.setRunEngineState
      |> ignore :
      ();

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

let component = ReasonReact.statelessComponent("MainEditorCameraView");

let render = ((store, dispatchFunc), _self) => {
  let currentSceneTreeNode =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;
  let engineState = StateLogicService.getRunEngineState();

  let currentBasicCameraViewComponent =
    engineState
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(
         currentSceneTreeNode,
       );
  let isCurrentCamera =
    BasicCameraViewEngineService.isActiveBasicCameraView(
      currentBasicCameraViewComponent,
      engineState,
    );

  <article key="MainEditorCameraView" className="wonder-camera-view">
    <Select
      label="type : "
      options=(MainEditorMaterialUtils.getMaterialOptions())
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
            currentBasicCameraViewComponent,
            engineState,
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