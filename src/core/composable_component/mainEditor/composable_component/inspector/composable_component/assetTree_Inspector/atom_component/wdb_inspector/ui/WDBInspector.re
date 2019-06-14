module Method = {
  let didMount = (currentNodeId, wdbGameObject, dispatchFunc) => {
    InspectorCanvasUtils.showInspectorCanvas();

    Console.tryCatch(
      () => {
        let (newWDBGameObject, editorState, inspectorEngineState) =
          StateInspectorEngineService.unsafeGetState()
          |> WDBInspectorEngineUtils.createWDBIntoInspectorCanvas(
               wdbGameObject,
               StateEditorService.getState(),
               StateEngineService.unsafeGetState(),
             );

        editorState |> StateEditorService.setState |> ignore;

        inspectorEngineState
        |> WDBInspectorEngineUtils.setCameraFocusWDBGameObject(
             newWDBGameObject,
           )
        |> InspectorCanvasUtils.restoreArcballCameraControllerAngle
        |> StateLogicService.refreshInspectorEngineState;

        InspectorCanvasUtils.updateSnapshot(
          currentNodeId,
          (
            ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId,
            dispatchFunc,
          ),
        );
      },
      e => Console.throwFatal(e) |> ignore,
    );
  };

  let willUnmount = () => {
    InspectorCanvasUtils.hideInspectorCanvas();

    (
      StateEditorService.getState(),
      StateInspectorEngineService.unsafeGetState(),
    )
    |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
    |> InspectorCanvasUtils.setCameraDefaultDistance
    |> StateInspectorEngineService.setState
    |> ignore;
  };
};

let component = ReasonReact.statelessComponent("WDBInspector");

let render = (name, (onChangeFunc, onBlurFunc), _self) =>
  <article className="inspector-asset-wdb">
    <h1> {DomHelper.textEl("Model")} </h1>
    <hr />
    <div className="inspector-item">
      <div className="item-header"> {DomHelper.textEl("Name:")} </div>
      <div className="item-content">
        <input
          className="input-component float-input"
          type_="text"
          value=name
          onChange=onChangeFunc
          onBlur=onBlurFunc
        />
      </div>
    </div>
  </article>;

let make =
    (
      ~dispatchFunc,
      ~name,
      ~onChangeFunc,
      ~onBlurFunc,
      ~currentNodeId,
      ~wdbGameObject,
      _children,
    ) => {
  ...component,
  render: _self => render(name, (onChangeFunc, onBlurFunc), _self),
  didMount: _self =>
    Method.didMount(currentNodeId, wdbGameObject, dispatchFunc),
  willUnmount: _self => Method.willUnmount(),
};