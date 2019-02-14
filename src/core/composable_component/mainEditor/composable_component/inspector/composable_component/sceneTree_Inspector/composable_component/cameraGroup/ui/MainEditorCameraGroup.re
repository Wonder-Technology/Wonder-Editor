let component = ReasonReact.statelessComponent("MainEditorCameraGroup");

let render = ((uiState, dispatchFunc), _self) =>
  <article key="MainEditorCameraGroup" className="wonder-camera-group">
    <div className="inspector-component">
      <div className="component-title"> (DomHelper.textEl("CameView")) </div>
      <hr />
      <div className="component-content">
        <MainEditorCameraView uiState dispatchFunc />
      </div>
    </div>
    <div className="inspector-component">
      <div className="component-title">
        (DomHelper.textEl("Projection"))
      </div>
      <hr />
      <div className="component-content">
        <MainEditorCameraProjection uiState dispatchFunc />
      </div>
    </div>
  </article>;

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), self),
};