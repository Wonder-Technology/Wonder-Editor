module Method = {
  let didMount = wdbGameObject => {
    Js.log("wdb did mount");

    AssetTreeInspectorUtils.showInspectorCanvas();

    StateInspectorEngineService.unsafeGetState()
    |> WDBInspectorEngineUtils.createWDBIntoInspectorCanvas(
         wdbGameObject,
         (StateEditorService.getState(), StateEngineService.unsafeGetState()),
       )
    |> StateLogicService.refreshInspectorEngineState;
  };

  let willUnmount =  AssetTreeInspectorUtils.hideInspectorCanvasAndDisposeContainerGameObjectAllChildren;
};

let component = ReasonReact.statelessComponent("WDBInspector");

let render = (name, (onChangeFunc, onBlurFunc), _self) =>
  <article className="inspector-asset-wdb">
    <h1> {DomHelper.textEl("Model")} </h1>
    <hr />
    <div className="inspector-item">
      <div className="item-header">
        <span className=""> {DomHelper.textEl("Name:")} </span>
      </div>
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