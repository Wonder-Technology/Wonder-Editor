module Method = {
  let didMount = wdbGameObject => {
    AssetTreeInspectorUtils.showInspectorCanvas();

    Console.tryCatch(
      () =>
        StateInspectorEngineService.unsafeGetState()
        |> WDBInspectorEngineUtils.createWDBIntoInspectorCanvas(
             wdbGameObject,
             (
               StateEditorService.getState(),
               StateEngineService.unsafeGetState(),
             ),
           )
        |> StateLogicService.refreshInspectorEngineState,
      e => Console.throwFatal(e) |> ignore,
    );
  };

  let willUnmount = () => {
    AssetTreeInspectorUtils.hideInspectorCanvas();

    (
      StateEditorService.getState(),
      StateInspectorEngineService.unsafeGetState(),
    )
    |> AssetTreeInspectorUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
    |> AssetTreeInspectorUtils.setCameraDefaultDistance
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

let make = (~name, ~onChangeFunc, ~onBlurFunc, ~wdbGameObject, _children) => {
  ...component,
  render: _self => render(name, (onChangeFunc, onBlurFunc), _self),
  didMount: _self => Method.didMount(wdbGameObject),
  willUnmount: _self => Method.willUnmount(),
};