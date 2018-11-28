let component = ReasonReact.statelessComponent("MainEditorCameraGroup");

let render = ((store, dispatchFunc), _self) =>
  <article key="MainEditorCameraGroup" className="wonder-camera-group">
    <div className="inspector-component">
      <div className="component-title"> (DomHelper.textEl("CameView")) </div>
      <hr />
      <div className="component-content">
        <MainEditorCameraView store dispatchFunc />
      </div>
    </div>
    <div className="inspector-component">
      <div className="component-title">
        (DomHelper.textEl("Projection"))
      </div>
      <hr />
      <div className="component-content">
        <MainEditorCameraProjection store dispatchFunc />
      </div>
    </div>
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};